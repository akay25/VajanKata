import React from 'react';
import {View, StyleSheet} from 'react-native';

// Local imports
import MinMaxValueCircle from '~/components/MinMaxValueCircle';
import CurvedBackground from '~/components/CurvedBackground';
import BackButton from '~/components/BackButton';
import WeightScaleHeader from '~/components/WeightScaleScreen/Header';
import Scale from '~/components/WeightScaleScreen/Scale';
import COLORS from '~/styles/colors';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '~/constants/device';
import {BUTTON} from '~/styles/generic';

const DATA_CONTAINER_HEIGHT = DEVICE_HEIGHT * 0.84;

export function WeightScaleScreen() {
  return (
    <View style={styles.localContainer}>
      <View style={styles.dataContainer}>
        <WeightScaleHeader />
        <View style={styles.mainContent}>
          <Scale />
        </View>
      </View>
      <CurvedBackground>
        <View style={styles.minMaxContainer}>
          <MinMaxValueCircle value={47.2} min={true} />
          <MinMaxValueCircle value={51.3} min={false} />
        </View>
        <BackButton customStyle={styles.backButtonCustom} />
      </CurvedBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  localContainer: {
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
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
    backgroundColor: '#ffffff',
  },
  mainContent: {
    width: '100%',
    height: DATA_CONTAINER_HEIGHT * 0.6,
    marginTop: 2,
    padding: 8,
  },
  minMaxContainer: {
    width: '56%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'center',
    top: -BUTTON.HEIGHT,
  },
});

export default WeightScaleScreen;
