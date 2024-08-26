import React from 'react';
import {View, Text, StyleSheet, ViewStyle} from 'react-native';

interface ScaleProps {
  style?: ViewStyle;
}

const Scale = (props: ScaleProps) => {
  return (
    <View style={props.style}>
      <Text>45.6</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Scale;
