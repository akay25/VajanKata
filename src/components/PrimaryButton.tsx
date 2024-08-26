import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import colors from '~/styles/colors';
import fonts from '~/styles/fonts';

interface PrimaryButtonProps {
  text: string;
  disabled?: boolean;
  onPress: (e: any) => void;
  style?: any;
}

const PrimaryButton = (props: PrimaryButtonProps) => {
  return (
    <View style={[styles.container, props.style]}>
      <TouchableOpacity
        style={styles.button}
        onPress={props.onPress}
        activeOpacity={0.7}
        disabled={!!props.disabled}>
        <Text style={styles.buttonText}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  container: {},
  button: {
    height: 46,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: colors.PRIMARY,
  },
  buttonText: {
    fontFamily: fonts.JOST,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 20,
    letterSpacing: 0.25,
    textTransform: 'uppercase',
    color: colors.WHITE,
  },
});
