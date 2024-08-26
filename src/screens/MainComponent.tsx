import React from 'react';
import {View, StyleSheet} from 'react-native';

// Local imports
import MinMaxValueCircle from '~/components/MinMaxValueCircle';
import CurvedBackground from '~/components/CurvedBackground';
import BackButton from '~/components/BackButton';
import WeightScaleHeader from '~/components/WeightScaleScreen/Header';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '~/constants/device';
import GENERIC_STYLESHEET from '~/styles/generic';

const DATA_CONTAINER_HEIGHT = DEVICE_HEIGHT * 0.84;

export function WeightScaleScreen() {
  return (
    <View style={[GENERIC_STYLESHEET.container, styles.localContainer]}>
      <View style={styles.dataContainer}>
        <WeightScaleHeader />
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
  mainContent: {
    width: '100%',
    height: DATA_CONTAINER_HEIGHT * 0.6,
    marginTop: 2,
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
