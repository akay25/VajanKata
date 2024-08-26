import React from 'react';
import {View, StyleSheet} from 'react-native';

// Local imports
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '~/constants/device';
import GENERIC_STYLESHEET from '~/styles/generic';
import MinMaxValueCircle from '~/components/MinMaxValueCircle';
import CurvedBackground from '~/components/CurvedBackground';
import BackButton from '~/components/BackButton';

const DATA_CONTAINER_HEIGHT = DEVICE_HEIGHT * 0.84;

export function WeightScaleScreen() {
  return (
    <View style={[GENERIC_STYLESHEET.container, styles.localContainer]}>
      <View style={styles.dataContainer}>
        <View style={styles.headerMenuContainer}></View>
        <View style={styles.mainContent}></View>
        <View style={styles.minMaxContainer}>
          <MinMaxValueCircle value={47.2} min={true} />
          <MinMaxValueCircle value={51.3} min={false} />
        </View>
      </View>
      <CurvedBackground>
        <BackButton customStyle={styles.backButtonCustom} />
      </CurvedBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  localContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  backButtonCustom: {
    position: 'absolute',
    bottom: 40,
    left: 40,
  },
  dataContainer: {
    height: DATA_CONTAINER_HEIGHT,
    width: DEVICE_WIDTH,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerMenuContainer: {
    width: '100%',
    height: DATA_CONTAINER_HEIGHT * 0.18,
    borderWidth: 1,
    borderColor: 'green',
  },
  mainContent: {
    width: '100%',
    height: DATA_CONTAINER_HEIGHT * 0.6,
    borderWidth: 1,
    borderColor: 'purple',
  },
  minMaxContainer: {
    width: '56%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: 0,
  },
});

export default WeightScaleScreen;
