import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {RectButton, RectButtonProps} from 'react-native-gesture-handler';

import colors from '~/styles/colors';

interface IButtonProps extends RectButtonProps {
  title: string;
  activity?: boolean;
}

export function EnvironmentButton({
  title,
  activity = false,
  ...rest
}: IButtonProps) {
  return (
    <RectButton
      style={activity ? styles.containerActivity : styles.containerInactivity}
      {...rest}>
      <Text style={activity ? styles.titleActivity : styles.titleInactivity}>
        {title}
      </Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  containerInactivity: {
    height: 40,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.shape,
    borderRadius: 12,
    marginRight: 10,
  },
  titleInactivity: {
    color: colors.heading,
  },
  containerActivity: {
    height: 40,
    width: 80,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.green_light,
    borderRadius: 12,
    marginRight: 10,
  },
  titleActivity: {
    color: colors.green_dark,
    fontWeight: '700',
  },
});
