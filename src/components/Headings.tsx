import React from 'react';
import {Text, StyleSheet} from 'react-native';

import colors from '~/styles/colors';

interface HeadingProps {
  text: string;
}

export const H1 = (props: HeadingProps) => {
  return <Text style={styles.H1}>{props.text}</Text>;
};

export const SubHeading = (props: HeadingProps) => {
  return <Text style={styles.SubHeading}>{props.text}</Text>;
};

const styles = StyleSheet.create({
  H1: {
    color: colors.SECONDARY,
    fontFamily: 'Jost',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 30,
    letterSpacing: 0.25,
    textTransform: 'capitalize',
  },
  SubHeading: {
    color: colors.DARK_GRAY,
    fontFamily: 'Jost',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.25,
  },
});
