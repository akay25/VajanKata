/**
 * Sample BLE React Native App
 */

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  NativeModules,
  NativeEventEmitter,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
  ViewStyle
} from 'react-native';
import BleManager, {
  BleDisconnectPeripheralEvent,
  BleManagerDidUpdateValueForCharacteristicEvent,
  BleScanCallbackType,
  BleScanMatchMode,
  BleScanMode,
  Peripheral,
} from 'react-native-ble-manager';

// Local imports
import FONTS from '~/styles/fonts';
import COLORS from '~/styles/colors';
import { inject, observer } from 'mobx-react';
import { SettingsStoreProps } from '~/@types/SettingsStoreProps';

const SECONDS_TO_SCAN_FOR = 20;
const SERVICE_UUIDS: string[] = [];
const ALLOW_DUPLICATES = true;

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

declare module 'react-native-ble-manager' {
  // enrich local contract with custom state properties needed by App.tsx
  interface Peripheral {
    connected?: boolean;
    connecting?: boolean;
  }
}

// Hex weight calculator
const calculateWeightInG = (device: Peripheral): number => {
  if (!device.advertising.manufacturerRawData) {
    console.log("Manufacture data not available");
    return -1;
  }

  const buffer = device.advertising.manufacturerRawData.bytes;
  if (buffer.length !== 16) {
    console.log("Invalid data passed. ", buffer);
    return -1;
  }

  // Code for deccbugging value
  let dataString = [];
  for (const byt of buffer) {
    let hexCode = byt.toString(16);
    dataString.push(hexCode);
  }
  // console.log(dataString);
  //        0  1  2  3  4  5  6  7  8  9  10 11 12 13
  //       ac a0 6a 38 02 5a 85 a0 a0 2c a0 a0 0d b9
  // 0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15
  // 00 00 ac a0 6a 38 02 5a 85 a0 a0 2c a0 a0 0d b9
  const checkByte = (buffer[11] >> 4) & 0xF;
  if (checkByte === 0xA) {
    console.log("Done checking for weight");
    return -2;
  }

  // console.log("Check byte: ", checkByte.toString(16));

  const hexArr: number[] = [
    buffer[11] & 0xF, // Take the LSB from 11th bit
    buffer[12],
    buffer[13]
  ];

  let hexedWeightInG: number = (hexArr[0] << 16);
  hexedWeightInG |= (hexArr[1] << 8);
  hexedWeightInG |= hexArr[2];

  const OFFSET_TO_XOR: number = 0xCA0A0;
  const weightInG: number = hexedWeightInG ^ OFFSET_TO_XOR;

  return weightInG;
}

const DEVICE_NAMES = ['AAA041', 'OnePlus 5T'];

interface StartScanTextProps extends SettingsStoreProps {
  showSelf: boolean;
}

const StartScanText = inject('SettingsStore')(
  observer((props: StartScanTextProps) => {
    const { SettingsStore, showSelf } = props;
    const [isScanning, setIsScanning] = useState(false);

    const stopScanning = () => {
      BleManager.stopScan();
      handleStopScan();
    }
    const startScan = () => {
      console.debug('[startScan] starting scan...');
      if (!isScanning) {
        // reset found peripherals before scan
        try {
          setIsScanning(true);
          BleManager.scan(SERVICE_UUIDS, SECONDS_TO_SCAN_FOR, ALLOW_DUPLICATES, {
            matchMode: BleScanMatchMode.Sticky,
            scanMode: BleScanMode.LowLatency,
            callbackType: BleScanCallbackType.AllMatches,
          })
            .then(() => {
              console.debug('[startScan] scan promise returned successfully.');
            })
            .catch((err: any) => {
              console.error('[startScan] ble scan returned in error', err);
            });
        } catch (error) {
          console.error('[startScan] ble scan error thrown', error);
        }
      }
    };

    const handleStopScan = () => {
      setIsScanning(false);
      console.debug('[handleStopScan] scan is stopped.');
      SettingsStore.setWeightInG(0);
    };

    const handleDisconnectedPeripheral = (
      event: BleDisconnectPeripheralEvent,
    ) => {
      console.debug(
        `[handleDisconnectedPeripheral][${event.peripheral}] disconnected.`,
      );
    };

    const handleConnectPeripheral = (event: any) => {
      // console.log(`[handleConnectPeripheral][${event.peripheral}] connected.`);
    };

    const handleUpdateValueForCharacteristic = (
      data: BleManagerDidUpdateValueForCharacteristicEvent,
    ) => {
      // console.debug(
      //   `[handleUpdateValueForCharacteristic] received data from '${data.peripheral}' with characteristic='${data.characteristic}' and value='${data.value}'`,
      // );
    };

    const handleDiscoverPeripheral = (peripheral: Peripheral) => {
      if (DEVICE_NAMES.includes(peripheral.name)) {
        // console.log(peripheral);
        const weightInGs = calculateWeightInG(peripheral);
        if (weightInGs >= 0) {
          SettingsStore.setWeightInG(weightInGs)
        }
      }
    };

    useEffect(() => {
      try {
        BleManager.start({ showAlert: false })
          .then(() => {
            console.debug('BleManager started.');
          })
          .catch((error: any) =>
            console.error('BeManager could not be started.', error),
          );
      } catch (error) {
        console.error('unexpected error starting BleManager.', error);
        return;
      }

      const listeners = [
        bleManagerEmitter.addListener(
          'BleManagerDiscoverPeripheral',
          handleDiscoverPeripheral,
        ),
        bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan),
        bleManagerEmitter.addListener(
          'BleManagerDisconnectPeripheral',
          handleDisconnectedPeripheral,
        ),
        bleManagerEmitter.addListener(
          'BleManagerDidUpdateValueForCharacteristic',
          handleUpdateValueForCharacteristic,
        ),
        bleManagerEmitter.addListener(
          'BleManagerConnectPeripheral',
          handleConnectPeripheral,
        ),
      ];

      handleAndroidPermissions();

      return () => {
        console.debug('[app] main component unmounting. Removing listeners...');
        for (const listener of listeners) {
          listener.remove();
        }
        stopScanning();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleAndroidPermissions = () => {
      if (Platform.OS === 'android' && Platform.Version >= 31) {
        PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        ]).then(result => {
          if (result) {
            console.debug(
              '[handleAndroidPermissions] User accepts runtime permissions android 12+',
            );
          } else {
            console.error(
              '[handleAndroidPermissions] User refuses runtime permissions android 12+',
            );
          }
        });
      } else if (Platform.OS === 'android' && Platform.Version >= 23) {
        PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ).then(checkResult => {
          if (checkResult) {
            console.debug(
              '[handleAndroidPermissions] runtime permission Android <12 already OK',
            );
          } else {
            PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            ).then(requestResult => {
              if (requestResult) {
                console.debug(
                  '[handleAndroidPermissions] User accepts runtime permission android <12',
                );
              } else {
                console.error(
                  '[handleAndroidPermissions] User refuses runtime permission android <12',
                );
              }
            });
          }
        });
      }
    };

    if(showSelf)
      return (<TouchableOpacity onPress={startScan}><Text style={styles.promptText}>Stand on weight machine and tap here</Text></TouchableOpacity>);

    return null;
  })
);

const styles = StyleSheet.create({
  promptText: {
    textAlign: 'center',
    fontSize: 24,
    fontFamily: FONTS.subHeading,
    color: COLORS.DARK_GRAY,
  },
})

export default StartScanText;