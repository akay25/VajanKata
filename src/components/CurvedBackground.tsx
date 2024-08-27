import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';

// Local imports
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '~/constants/device';

interface CurvedBackgroundProps {
  children: React.ReactNode;
}

const CurvedBackground = (props: CurvedBackgroundProps) => (
  <ImageBackground
    style={styles.curvedArea}
    source={require('~/assets/images/BlueCurve.png')}>
    {props.children}
  </ImageBackground>
);

const styles = StyleSheet.create({
  curvedArea: {
    height: DEVICE_HEIGHT * 0.3,
    width: DEVICE_WIDTH,
    position: 'absolute',
    left: 0,
    top: DEVICE_HEIGHT - DEVICE_HEIGHT * 0.3,
    zIndex: 0,
  },
});

export default CurvedBackground;
