import React from 'react';
import {StyleSheet} from 'react-native';
// @ts-ignore
import FeatherIcon from 'react-native-vector-icons/Feather';
import colors from '~/styles/colors';

interface FeatherIconProps {
  name: string;
  size?: number;
  color?: string;
  style?: any;
}

const DEFAULT_ICON_SIZE = 20;
const DEFAULT_ICON_COLOR = colors.DARK_GRAY;

const Icon = (props: FeatherIconProps) => {
  return (
    <FeatherIcon
      style={!!props.style ? props.style : null}
      name={props.name}
      size={!!props.size ? props.size : DEFAULT_ICON_SIZE}
      color={!!props.color ? props.color : DEFAULT_ICON_COLOR}
    />
  );
};

export default Icon;
