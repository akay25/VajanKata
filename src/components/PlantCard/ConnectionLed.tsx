import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "~/styles/colors";
import BlinkingView from "../BlinkingView";


interface IConnectionLed {
  connected: boolean;
  neverConnected?: boolean
  transferringData?: boolean;
}

const defaultProps = {
  neverConnected: true,
  transferringData: false
}

const SIZE = 15;

const ConnectionLed = (props: IConnectionLed) => {
  props = { ...defaultProps, ...props };

  const backgroundColor = props.neverConnected ? colors.gray : (props.connected ? colors.green : colors.red);

  return <View style={[styles.connectionLed, { backgroundColor }]}></View>

  // if (!props.transferringData) {
  //   return <View style={[styles.connectionLed, { backgroundColor }]}></View>

  // }

  // return (
  //   <BlinkingView
  //     containerStyle={[styles.connectionLed, { backgroundColor }]}
  //   >
  //     <Text>sss</Text>
  //   </BlinkingView >
  // );
}

export default ConnectionLed;

const styles = StyleSheet.create({
  connectionLed: {
    height: SIZE,
    width: SIZE,
    borderRadius: 50,
  }
});