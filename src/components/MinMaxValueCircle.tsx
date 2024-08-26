import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from '~/components/FeatherIcon';

// Local imports
import COLORS from '~/styles/colors';
import FONTS from '~/styles/fonts';

interface MinMaxValueCircleProps {
  value: number;
  min?: boolean;
}

const INNER_RADIUS_DIFF = 20;
const PARENT_BUBBLE_SIZE = 75;
const CHILD_BUBBLE_SIZE = PARENT_BUBBLE_SIZE - INNER_RADIUS_DIFF;

const MinMaxValueCircle = (props: MinMaxValueCircleProps) => {
  return (
    <View style={styles.boxContainer}>
      <View
        style={[
          styles.parentContainer,
          {backgroundColor: props.min ? COLORS.PRIMARY : COLORS.SECONDARY},
        ]}>
        <View style={styles.childContainer}>
          <Icon
            name={props.min ? 'arrow-down' : 'arrow-up'}
            color={COLORS.WHITE}
            size={CHILD_BUBBLE_SIZE * 0.6}
          />
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.numberContainer}>{props.value}</Text>
        <Text style={styles.labelContainer}>
          {props.min ? 'Lowest' : 'Highest'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  parentContainer: {
    width: PARENT_BUBBLE_SIZE,
    height: PARENT_BUBBLE_SIZE,
    borderRadius: PARENT_BUBBLE_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY,
  },
  childContainer: {
    width: CHILD_BUBBLE_SIZE,
    height: CHILD_BUBBLE_SIZE,
    borderRadius: CHILD_BUBBLE_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.6,
    borderColor: COLORS.WHITE,
  },
  textContainer: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  numberContainer: {
    fontFamily: FONTS.label,
    fontSize: 30,
    color: COLORS.BLACK,
  },
  labelContainer: {
    fontFamily: FONTS.subHeading,
    fontSize: 14,
    color: COLORS.DARK_GRAY,
  },
});

export default MinMaxValueCircle;
