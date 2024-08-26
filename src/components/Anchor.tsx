import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import colors from '~/styles/colors';

interface AnchorProps {
  text: string;
  onPress: () => void;
  color?: string;
  size?: number;
  style?: any;
}

const DEFAULT_ANCHOR_COLOR = colors.SECONDARY;
const DEFAULT_ANCHOR_TEXT_SIZE = 12;

const Anchor = (props: AnchorProps) => {
  const calculatedColour = !!props.color ? props.color : DEFAULT_ANCHOR_COLOR;
  const calculatedTextSize = !!props.size
    ? props.size
    : DEFAULT_ANCHOR_TEXT_SIZE;

  return (
    <TouchableOpacity
      style={[styles.anchorTextContainer, props.style]}
      onPress={props.onPress}>
      <Text
        style={{
          ...styles.anchorText,
          color: calculatedColour,
          fontSize: calculatedTextSize,
        }}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

export default Anchor;

const styles = StyleSheet.create({
  anchorTextContainer: {
    alignContent: 'center',
    alignItems: 'center',
  },
  anchorText: {
    fontFamily: 'Jost',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: -0.25,
    alignSelf: 'center',
    textAlign: 'center',
  },
});
