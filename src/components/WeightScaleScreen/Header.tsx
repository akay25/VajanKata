import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';
import {observer, inject} from 'mobx-react';

// Local imports
import ChartButton from '~/components/ChartButton';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '~/constants/device';
import COLORS from '~/styles/colors';
import fonts from '~/styles/fonts';
import {SettingsStoreProps} from '~/@types/SettingsStoreProps';

const DATA_CONTAINER_HEIGHT = DEVICE_HEIGHT * 0.84;

const WeightScaleHeader = inject('SettingsStore')(
  observer((props: SettingsStoreProps) => {
    const {SettingsStore} = props;
    const [isKg, setIsKg] = useState(SettingsStore.display_weight_in_kg);

    const toggleUnit = val => {
      setIsKg(val);
      SettingsStore.toggleUnit(val);
    };

    return (
      <View style={styles.headerMenuContainer}>
        <View style={styles.menuButtonContainer}>
          <ChartButton />
        </View>
        <View style={styles.labelHeadings}>
          <View style={styles.leftHeadings}>
            <Text style={styles.labelHeadingText}>Statistics · </Text>
            <Text style={[styles.labelHeadingText, {fontWeight: 'bold'}]}>
              Weight
            </Text>
          </View>
          <View style={styles.rightHeading}>
            <TouchableWithoutFeedback
              style={{borderWidth: 1, borderColor: 'red'}}
              onPress={() => toggleUnit(true)}>
              <Text
                style={[
                  styles.labelHeadingText,
                  styles.rightHeadingText,
                  {borderBottomWidth: isKg ? 0.7 : 0},
                ]}>
                kg
              </Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => toggleUnit(false)}>
              <Text
                style={[
                  styles.labelHeadingText,
                  styles.rightHeadingText,
                  {borderBottomWidth: !isKg ? 0.7 : 0},
                ]}>
                lb
              </Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    );
  }),
);

const styles = StyleSheet.create({
  headerMenuContainer: {
    width: '100%',
    height: DATA_CONTAINER_HEIGHT * 0.18,
    flexDirection: 'column',
    alignItems: 'center',
  },
  menuButtonContainer: {
    height: 100,
    width: DEVICE_WIDTH * 0.8,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelHeadings: {
    width: DEVICE_WIDTH * 0.8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  leftHeadings: {
    flexDirection: 'row',
  },
  labelHeadingText: {
    fontSize: 15,
    fontFamily: fonts.subHeading,
    color: COLORS.BLACK,
  },
  rightHeading: {
    flex: 1,
    maxWidth: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 3,
  },
  rightHeadingText: {
    height: 30,
  },
});

export default WeightScaleHeader;
