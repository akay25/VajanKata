import React, {useState} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from 'react-native';

import colors from '~/styles/colors';
import fonts from '~/styles/fonts';

interface IButtonProps extends TouchableOpacityProps {
  title: string;
  width?: string;
}

export function Button({title, width = '100%', ...rest}: IButtonProps) {
  const [buttonOpacity, setButtonOpacity] = useState(1);

  return (
    <TouchableOpacity
      style={[styles.container, {width}]}
      activeOpacity={buttonOpacity}
      {...rest}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    width: '100%',
    backgroundColor: colors.green,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: fonts.heading,
    color: '#fff',
    fontSize: 16,
  },
});
