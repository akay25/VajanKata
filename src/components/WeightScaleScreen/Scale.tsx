import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ViewStyle} from 'react-native';
import AnimateNumber from 'react-native-animate-number';
import COLORS from '~/styles/colors';
import FONTS from '~/styles/fonts';

// Local imports
import {generateRandomNumber} from '~/utils/helper';

interface ScaleProps {
  style?: ViewStyle;
}

const WEIGHT_SECTION_HEIGHT = 100;

const Scale = (props: ScaleProps) => {
  const [weight, setWeight] = useState(0.0);

  // COmponent mount
  useEffect(() => {
    const randomWeight = generateRandomNumber(1, 180);
    setWeight(randomWeight);
  }, []);

  return (
    <View style={[styles.scaleContainer, props.style]}>
      {/* <Text>{weight}</Text> */}
      <View style={styles.popUpContainer}></View>
      <View style={styles.weightContainer}>
        <AnimateNumber
          style={styles.number}
          value={weight}
          formatter={val => {
            return parseFloat(val).toFixed(1) + ' kgs';
          }}
        />
      </View>
      <View style={styles.rulerContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  scaleContainer: {
    borderWidth: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  popUpContainer: {
    height: WEIGHT_SECTION_HEIGHT,
    width: '100%',
  },
  weightContainer: {
    height: WEIGHT_SECTION_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    fontSize: 54,
    fontFamily: FONTS.label,
    color: COLORS.BLACK,
    letterSpacing: -2.8,
  },
  rulerContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'red',
  },
});

export default Scale;
