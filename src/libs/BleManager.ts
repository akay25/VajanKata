/**
 * Sample BLE React Native App
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  NativeModules,
  NativeEventEmitter,
  Platform,
  PermissionsAndroid,
  FlatList,
  TouchableHighlight,
  Pressable,
} from 'react-native';


import BleManager, {
  BleDisconnectPeripheralEvent,
  BleManagerDidUpdateValueForCharacteristicEvent,
  BleScanCallbackType,
  BleScanMatchMode,
  BleScanMode,
  Peripheral,
  PeripheralInfo,
} from 'react-native-ble-manager';

const SECONDS_TO_SCAN_FOR = 3;
const SERVICE_UUIDS: string[] = [];
const ALLOW_DUPLICATES = true;

export const BleManagerModule = NativeModules.BleManager;
export const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

declare module 'react-native-ble-manager' {
  // enrich local contract with custom state properties needed by App.tsx
  interface Peripheral {
    connected?: boolean;
    connecting?: boolean;
  }
}

const DEVICE_NAMES = ['AAA041','OnePlus 5T'];


// const ScanDevicesScreen = () => {

//   const [isScanning, setIsScanning] = useState(false);
//   const [peripherals, setPeripherals] = useState(
//     new Map<Peripheral['id'], Peripheral>(),
//   );

//   //console.debug('peripherals map updated', [...peripherals.entries()]);

//   const startScan = () => {
//     if (!isScanning) {
//       // reset found peripherals before scan
//       setPeripherals(new Map<Peripheral['id'], Peripheral>());

//       try {
//         console.debug('[startScan] starting scan...');
//         setIsScanning(true);
//         BleManager.scan(SERVICE_UUIDS, SECONDS_TO_SCAN_FOR, ALLOW_DUPLICATES, {
//           matchMode: BleScanMatchMode.Sticky,
//           scanMode: BleScanMode.LowLatency,
//           callbackType: BleScanCallbackType.AllMatches,
//         })
//           .then(() => {
//             console.debug('[startScan] scan promise returned successfully.');
//           })
//           .catch((err: any) => {
//             console.error('[startScan] ble scan returned in error', err);
//           });
//       } catch (error) {
//         console.error('[startScan] ble scan error thrown', error);
//       }
//     }
//   };

//   const startCompanionScan = () => {
//     setPeripherals(new Map<Peripheral['id'], Peripheral>());
//     try {
//       console.debug('[startCompanionScan] starting companion scan...');
//       BleManager.companionScan(SERVICE_UUIDS, { single: false })
//         .then((peripheral: Peripheral|null) => {
//           console.debug('[startCompanionScan] scan promise returned successfully.', peripheral);
//           if (peripheral != null) {
//             setPeripherals(map => {
//               return new Map(map.set(peripheral.id, peripheral));
//             });
//           }
//         })
//         .catch((err: any) => {
//           console.debug('[startCompanionScan] ble scan cancel', err);
//         });
//     } catch (error) {
//       console.error('[startCompanionScan] ble scan error thrown', error);
//     }
//   }

//   const enableBluetooth = async () => {
//     try {
//       console.debug('[enableBluetooth]');
//       await BleManager.enableBluetooth();
//     } catch (error) {
//       console.error('[enableBluetooth] thrown', error);
//     }
//   }
  
//   const handleStopScan = () => {
//     setIsScanning(false);
//     console.debug('[handleStopScan] scan is stopped.');
//   };

//   const handleDisconnectedPeripheral = (
//     event: BleDisconnectPeripheralEvent,
//   ) => {
//     console.debug(
//       `[handleDisconnectedPeripheral][${event.peripheral}] disconnected.`,
//     );
//     setPeripherals(map => {
//       let p = map.get(event.peripheral);
//       if (p) {
//         p.connected = false;
//         return new Map(map.set(event.peripheral, p));
//       }
//       return map;
//     });
//   };

//   const handleConnectPeripheral = (event: any) => {
//     // console.log(`[handleConnectPeripheral][${event.peripheral}] connected.`);
//   };

//   const handleUpdateValueForCharacteristic = (
//     data: BleManagerDidUpdateValueForCharacteristicEvent,
//   ) => {
//     // console.debug(
//     //   `[handleUpdateValueForCharacteristic] received data from '${data.peripheral}' with characteristic='${data.characteristic}' and value='${data.value}'`,
//     // );
//   };

//   const handleDiscoverPeripheral = (peripheral: Peripheral) => {
//     // console.debug('[handleDiscoverPeripheral] new BLE peripheral=', peripheral);
//     if (!peripheral.name) {
//       peripheral.name = 'NO NAME';
//     }
//     setPeripherals(map => {
//       return new Map(map.set(peripheral.id, peripheral));
//     });
//   };

//   const togglePeripheralConnection = async (peripheral: Peripheral) => {
//     if (peripheral && peripheral.connected) {
//       try {
//         await BleManager.disconnect(peripheral.id);
//       } catch (error) {
//         console.error(
//           `[togglePeripheralConnection][${peripheral.id}] error when trying to disconnect device.`,
//           error,
//         );
//       }
//     } else {
//       await connectPeripheral(peripheral);
//     }
//   };

//   const retrieveConnected = async () => {
//     try {
//       const connectedPeripherals = await BleManager.getConnectedPeripherals();
//       if (connectedPeripherals.length === 0) {
//         console.warn('[retrieveConnected] No connected peripherals found.');
//         return;
//       }

//       console.debug(
//         '[retrieveConnected]', connectedPeripherals.length, 'connectedPeripherals',
//         connectedPeripherals,
//       );

//       for (let peripheral of connectedPeripherals) {
//         setPeripherals(map => {
//           let p = map.get(peripheral.id);
//           if (p) {
//             p.connected = true;
//             return new Map(map.set(p.id, p));
//           }
//           return map;
//         });
//       }
//     } catch (error) {
//       console.error(
//         '[retrieveConnected] unable to retrieve connected peripherals.',
//         error,
//       );
//     }
//   };

//   const retrieveServices = async () => {
//     const peripheralInfos: PeripheralInfo[] = [];
//     for (let [peripheralId, peripheral] of peripherals) {
//       if (peripheral.connected) {
//         const newPeripheralInfo = await BleManager.retrieveServices(peripheralId);
//         peripheralInfos.push(newPeripheralInfo);
//       }
//     }
//     return peripheralInfos;
//   };

//   const readCharacteristics = async () => {
//     let services = await retrieveServices();

//     for (let peripheralInfo of services) {
//       peripheralInfo.characteristics?.forEach(async c => {
//         try {
//           const value = await BleManager.read(peripheralInfo.id, c.service, c.characteristic);
//         //   console.log("[readCharacteristics]", "peripheralId", peripheralInfo.id, "service", c.service, "char", c.characteristic, "\n\tvalue", value);
//         } catch (error) {
//           console.error("[readCharacteristics]", "Error reading characteristic", error);
//         }
//       });
//     }
//   }

//   const getAssociatedPeripherals = async () => {
//     try {
//       const associatedPeripherals = await BleManager.getAssociatedPeripherals();
//       console.debug(
//         '[getAssociatedPeripherals] associatedPeripherals',
//         associatedPeripherals,
//       );

//       for (let peripheral of associatedPeripherals) {
//         setPeripherals(map => {
//           return new Map(map.set(peripheral.id, peripheral));
//         });
//       }
//     } catch (error) {
//       console.error(
//         '[getAssociatedPeripherals] unable to retrieve associated peripherals.',
//         error,
//       );
//     }
//   }

//   const connectPeripheral = async (peripheral: Peripheral) => {
//     try {
//       if (peripheral) {
//         setPeripherals(map => {
//           let p = map.get(peripheral.id);
//           if (p) {
//             p.connecting = true;
//             return new Map(map.set(p.id, p));
//           }
//           return map;
//         });

//         await BleManager.connect(peripheral.id);
//         console.debug(`[connectPeripheral][${peripheral.id}] connected.`);

//         setPeripherals(map => {
//           let p = map.get(peripheral.id);
//           if (p) {
//             p.connecting = false;
//             p.connected = true;
//             return new Map(map.set(p.id, p));
//           }
//           return map;
//         });

//         // before retrieving services, it is often a good idea to let bonding & connection finish properly
//         await sleep(900);

//         /* Test read current RSSI value, retrieve services first */
//         const peripheralData = await BleManager.retrieveServices(peripheral.id);
//         console.debug(
//           `[connectPeripheral][${peripheral.id}] retrieved peripheral services`,
//           peripheralData,
//         );

//         setPeripherals(map => {
//           let p = map.get(peripheral.id);
//           if (p) {
//             return new Map(map.set(p.id, p));
//           }
//           return map;
//         });

//         const rssi = await BleManager.readRSSI(peripheral.id);
//         console.debug(
//           `[connectPeripheral][${peripheral.id}] retrieved current RSSI value: ${rssi}.`,
//         );

//         if (peripheralData.characteristics) {
//           for (let characteristic of peripheralData.characteristics) {
//             if (characteristic.descriptors) {
//               for (let descriptor of characteristic.descriptors) {
//                 try {
//                   let data = await BleManager.readDescriptor(
//                     peripheral.id,
//                     characteristic.service,
//                     characteristic.characteristic,
//                     descriptor.uuid,
//                   );
//                   console.debug(
//                     `[connectPeripheral][${peripheral.id}] ${characteristic.service} ${characteristic.characteristic} ${descriptor.uuid} descriptor read as:`,
//                     data,
//                   );
//                 } catch (error) {
//                   console.error(
//                     `[connectPeripheral][${peripheral.id}] failed to retrieve descriptor ${descriptor} for characteristic ${characteristic}:`,
//                     error,
//                   );
//                 }
//               }
//             }
//           }
//         }

//         setPeripherals(map => {
//           let p = map.get(peripheral.id);
//           if (p) {
//             p.rssi = rssi;
//             return new Map(map.set(p.id, p));
//           }
//           return map;
//         });
//         // console.log("[connectPeripheral]", "peripheralData", peripheralData);
//         // navigation.navigate('PeripheralDetails', {
//         //   peripheralData: peripheralData,
//         // });
//       }
//     } catch (error) {
//       console.error(
//         `[connectPeripheral][${peripheral.id}] connectPeripheral error`,
//         error,
//       );
//     }
//   };

//   function sleep(ms: number) {
//     return new Promise<void>(resolve => setTimeout(resolve, ms));
//   }

//   useEffect(() => {
//     try {
//       BleManager.start({ showAlert: false })
//         .then(() => console.debug('BleManager started.'))
//         .catch((error: any) =>
//           console.error('BeManager could not be started.', error),
//         );
//     } catch (error) {
//       console.error('unexpected error starting BleManager.', error);
//       return;
//     }

//     const listeners = [
//       bleManagerEmitter.addListener(
//         'BleManagerDiscoverPeripheral',
//         handleDiscoverPeripheral,
//       ),
//       bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan),
//       bleManagerEmitter.addListener(
//         'BleManagerDisconnectPeripheral',
//         handleDisconnectedPeripheral,
//       ),
//       bleManagerEmitter.addListener(
//         'BleManagerDidUpdateValueForCharacteristic',
//         handleUpdateValueForCharacteristic,
//       ),
//       bleManagerEmitter.addListener(
//         'BleManagerConnectPeripheral',
//         handleConnectPeripheral,
//       ),
//     ];

//     handleAndroidPermissions();

//     return () => {
//       console.debug('[app] main component unmounting. Removing listeners...');
//       for (const listener of listeners) {
//         listener.remove();
//       }
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);


//   const renderItem = ({ item }: { item: Peripheral }) => {
//     const backgroundColor = 'red';
//     if(DEVICE_NAMES.includes(item.name)){
//         console.log("[renderItem]", item);
//         const bytes = item.advertising.manufacturerRawData.bytes;
//         console.log("Byts: ", bytes);
//     }
//     return (
//       <TouchableHighlight
//         underlayColor="#0082FC"
//         onPress={() => togglePeripheralConnection(item)}>
//         <View style={[styles.row, { backgroundColor }]}>
//           <Text style={styles.peripheralName}>
//             {/* completeLocalName (item.name) & shortAdvertisingName (advertising.localName) may not always be the same */}
//             {item.name} - {item?.advertising?.localName}
//             {item.connecting && ' - Connecting...'}
//           </Text>
//           <Text style={styles.rssi}>RSSI: {item.rssi}</Text>
//           <Text style={styles.peripheralId}>{item.id}</Text>
//         </View>
//       </TouchableHighlight>
//     );
//   };

//   return (
//     <>
//         <View style={styles.buttonGroup}>
//           <Pressable style={styles.scanButton} onPress={startScan}>
//             <Text style={styles.scanButtonText}>
//               {isScanning ? 'Scanning...' : 'Scan Bluetooth'}
//             </Text>
//           </Pressable>

//           <Pressable style={styles.scanButton} onPress={retrieveConnected}>
//             <Text style={styles.scanButtonText} lineBreakMode='middle'>
//               {'Retrieve connected peripherals'}
//             </Text>
//           </Pressable>

//           <Pressable style={styles.scanButton} onPress={readCharacteristics}>
//             <Text style={styles.scanButtonText}>Read characteristics</Text>
//           </Pressable>
//         </View>

//         {Platform.OS === 'android' &&
//           (
//             <>
//               <View style={styles.buttonGroup}>
//                 <Pressable style={styles.scanButton} onPress={startCompanionScan}>
//                   <Text style={styles.scanButtonText}>
//                     {'Scan Companion'}
//                   </Text>
//                 </Pressable>

//                 <Pressable style={styles.scanButton} onPress={getAssociatedPeripherals}>
//                   <Text style={styles.scanButtonText}>
//                     {'Get Associated Peripherals'}
//                   </Text>
//                 </Pressable>
//               </View>

//               <View style={styles.buttonGroup}>
//                 <Pressable style={styles.scanButton} onPress={enableBluetooth}>
//                   <Text style={styles.scanButtonText}>
//                     {'Enable Bluetooh'}
//                   </Text>
//                 </Pressable>                
//               </View>
//             </>
//           )}

//         {Array.from(peripherals.values()).length === 0 && (
//           <View style={styles.row}>
//             <Text style={styles.noPeripherals}>
//               No Peripherals, press "Scan Bluetooth" above.
//             </Text>
//           </View>
//         )}


//         <FlatList
//           data={Array.from(peripherals.values())}
//           contentContainerStyle={{ rowGap: 12 }}
//           renderItem={renderItem}
//           keyExtractor={item => item.id}
//           style={{
//             marginBottom : 100
//           }}
//         />
//         <View style={{ height : 40 }}>
//             <Text>Hello </Text>
//         </View>
//     </>
//   );
// };

// const boxShadow = {
//   shadowColor: '#000',
//   shadowOffset: {
//     width: 0,
//     height: 2,
//   },
//   shadowOpacity: 0.25,
//   shadowRadius: 3.84,
//   elevation: 5,
// };

// const styles = StyleSheet.create({
//   engine: {
//     position: 'absolute',
//     right: 10,
//     bottom: 0,
//     color: '#000000',
//   },
//   buttonGroup: {
//     flexDirection: 'row',
//     width: '100%'
//   },
//   scanButton: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 16,
//     paddingHorizontal: 16,
//     backgroundColor: '#0a398a',
//     margin: 10,
//     borderRadius: 12,
//     flex: 1,
//     ...boxShadow,
//   },
//   scanButtonText: {
//     fontSize: 16,
//     letterSpacing: 0.25,
//     color: 'white',
//   },
//   body: {
//     backgroundColor: '#0082FC',
//     flex: 1,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: '#0082FC',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: 'white',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: 'white',
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
//   peripheralName: {
//     fontSize: 16,
//     textAlign: 'center',
//     padding: 10,
//   },
//   rssi: {
//     fontSize: 12,
//     textAlign: 'center',
//     padding: 2,
//   },
//   peripheralId: {
//     fontSize: 12,
//     textAlign: 'center',
//     padding: 2,
//     paddingBottom: 20,
//   },
//   row: {
//     marginLeft: 10,
//     marginRight: 10,
//     borderRadius: 20,
//     ...boxShadow,
//   },
//   noPeripherals: {
//     margin: 10,
//     textAlign: 'center',
//     color: 'white',
//   },
// });

// export default ScanDevicesScreen;