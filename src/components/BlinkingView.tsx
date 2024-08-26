import React, { useEffect, useRef, useState } from "react";
import { View, Animated } from "react-native";
import { console_log } from "~/utils/helper";

interface IBlinkingView {
  delayVisible?: number;
  delayInvisible?: number;
  blinking?: boolean;
  duration?: number;
  containerStyle?: object;
  children?: any;
};

const defaultProps = {
  delayVisible: 1000,
  delayInvisible: 1000,
  blinking: true,
  duration: 1000,
  containerStyle: {}
};

const BlinkingView = (props: IBlinkingView) => {
  // Load default values
  props = { ...defaultProps, ...props };

  // Declare values
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const animateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [opacityValue, setOpacityValue] = useState(1);

  useEffect(() => {
    fadeAnim.addListener(({ value }: { value: number }) => {
      console.log("chiange value here")
      setOpacityValue(value);
    });
    startAnimatedBlinking();

    // Component un-mount
    return () => {
      // TODO: Remove the animated loop
      fadeAnim.removeAllListeners();

      // Remove the timeout event
      if (animateTimeoutRef.current) {
        clearTimeout(animateTimeoutRef.current);
        animateTimeoutRef.current = null;
      }
    }
  }, []);

  const startAnimatedBlinking = () => {
    const { delayVisible, delayInvisible, duration, blinking } = props;
    const toValue = opacityValue === 1 ? 0 : 1;

    // Do nothing if blinking is not enabled
    if (!blinking) return;

    Animated.timing(fadeAnim, {
      toValue,
      duration,
      useNativeDriver: true,
    }).start(() => {
      if (animateTimeoutRef.current) clearTimeout(animateTimeoutRef.current);

      if (toValue === 1)
        animateTimeoutRef.current = setTimeout(startAnimatedBlinking, delayVisible);
      else
        animateTimeoutRef.current = setTimeout(startAnimatedBlinking, delayInvisible);
    });
  }

  console_log("Container style: ", props.containerStyle)

  return <Animated.View style={{ ...props.containerStyle, opacity: fadeAnim }}>{props.children}</Animated.View>
}

export default BlinkingView;