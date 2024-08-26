import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';

// Local imports
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '~/constants/device';

const CurvedBackground = () => (
  <ImageBackground
    style={styles.curvedArea}
    source={require('~/assets/images/BlueCurve.png')}></ImageBackground>
);

const styles = StyleSheet.create({
  curvedArea: {
    height: DEVICE_HEIGHT * 0.3,
    width: DEVICE_WIDTH,
    position: 'absolute',
    bottom: -DEVICE_HEIGHT,
    zIndex: -10,
  },
});

export default CurvedBackground;
