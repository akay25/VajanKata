import React from 'react';
import {View, StyleSheet, Text, TouchableHighlight} from 'react-native';

// Local imports
import ChartButton from '~/components/ChartButton';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '~/constants/device';
import COLORS from '~/styles/colors';
import fonts from '~/styles/fonts';

const DATA_CONTAINER_HEIGHT = DEVICE_HEIGHT * 0.84;

const WeightScaleHeader = () => {
  const selectedValue = 'kg';

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
          <TouchableHighlight>
            <Text
              style={[
                styles.labelHeadingText,
                styles.rightHeadingText,
                {borderBottomWidth: selectedValue == 'kg' ? 0.7 : 0},
              ]}>
              kg
            </Text>
          </TouchableHighlight>
          <TouchableHighlight>
            <Text
              style={[
                styles.labelHeadingText,
                styles.rightHeadingText,
                {borderBottomWidth: selectedValue == 'lb' ? 0.7 : 0},
              ]}>
              lb
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

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
  },
  rightHeadingText: {
    height: 30,
  },
});

export default WeightScaleHeader;
