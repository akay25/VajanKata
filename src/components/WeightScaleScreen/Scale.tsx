import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  FlatList,
  Vibration,
  Text,
} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import AnimateNumber from 'react-native-animate-number';
import Sound from 'react-native-sound';

// Local imports
import COLORS from '~/styles/colors';
import FONTS from '~/styles/fonts';
import Bar from './Bar';
import {DEVICE_WIDTH} from '~/constants/device';

interface ScaleProps {
  style?: ViewStyle;
}

// Declare it in main index.js file later
Sound.setCategory('Playback');
const SPOKE_SOUND = new Sound('spoke.wav', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('Failed to load the sound', error);
    return;
  }
  // when loaded successfully
  console.log(
    'Duration in seconds: ' +
      SPOKE_SOUND.getDuration() +
      'number of channels: ' +
      SPOKE_SOUND.getNumberOfChannels(),
  );
});
SPOKE_SOUND.setVolume(0.2);

const WEIGHT_SECTION_HEIGHT = 100;
const MID_POINT_X = DEVICE_WIDTH / 2 - 8;

const MAX_WEIGHT = 20;
const PARTS_IN_BETWEEN = 10;

let DATA = [];
for (let i = 0; i <= MAX_WEIGHT; i++) {
  if (i == MAX_WEIGHT) {
    DATA.push({
      key: `${i}.0`,
      int: i,
      dec: 0,
    });
  } else {
    for (let j = 0; j < PARTS_IN_BETWEEN; j++) {
      DATA.push({
        key: `${i}.${j}`,
        int: i,
        dec: j,
      });
    }
  }
}

const Scale = (props: ScaleProps) => {
  const [weight, setWeight] = useState(0.0);

  useEffect(() => {
    return () => {
      SPOKE_SOUND.stop();
      SPOKE_SOUND.release();
    };
  }, []);

  return (
    <View style={[styles.scaleContainer, props.style]}>
      {/* <Text>{weight}</Text> */}
      <View style={styles.popUpContainer}></View>
      <View style={styles.weightContainer}>
        {/* <AnimateNumber
          style={styles.number}
          value={weight}
          interval={9}
          countBy={0.1}
          timing="easeOut"
          formatter={val => {
            return parseFloat(val).toFixed(1) + ' kgs';
          }}
        /> */}
        <Text style={styles.number}>
          {parseFloat(weight + '').toFixed(1)} kgs
        </Text>
      </View>
      <View style={styles.rulerContainer}>
        <FlatList
          horizontal={true}
          scrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={styles.ruler}
          removeClippedSubviews={true}
          maxToRenderPerBatch={45}
          initialNumToRender={45}
          getItemLayout={(data, index) => ({
            length: 15,
            offset: 15 * index,
            index,
          })}
          data={DATA}
          ListHeaderComponent={() => {
            return (
              <View
                style={{
                  width: MID_POINT_X - 4,
                  height: 1,
                }}></View>
            );
          }}
          ListFooterComponent={() => {
            return (
              <View
                style={{
                  width: MID_POINT_X,
                  height: 1,
                }}></View>
            );
          }}
          renderItem={({item}) => (
            <Bar
              int={item.int}
              dec={item.dec}
              isMaxWeight={item.int == MAX_WEIGHT}
            />
          )}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          snapToAlignment={'center'}
          onScroll={e => {
            const contentOffsetX = e.nativeEvent.contentOffset.x;
            const offsetAfterMidpoint = contentOffsetX; //  + MID_POINT_X;
            const barCounts = offsetAfterMidpoint / 12.75;
            let newWeight = barCounts * 0.1;
            // Check for weight
            if (newWeight > MAX_WEIGHT) {
              newWeight = MAX_WEIGHT;
            } else if (newWeight < 0.0) {
              newWeight = 0.0;
            }

            // Find diff to trigger feedback events
            const weightDiff = Math.abs(newWeight - weight);
            if (weightDiff >= 0.2) {
              SPOKE_SOUND.play();
              ReactNativeHapticFeedback.trigger('impactLight');
              // Vibration.vibrate(1);
            }

            setWeight(newWeight);
          }}
          onScrollEndDrag={e => {
            Vibration.cancel();
            SPOKE_SOUND.stop();
          }}
        />
        <View style={styles.marker}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scaleContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  popUpContainer: {
    height: WEIGHT_SECTION_HEIGHT,
    width: '100%',
  },
  weightContainer: {
    height: WEIGHT_SECTION_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    fontSize: 54,
    fontFamily: FONTS.label,
    color: COLORS.BLACK,
    letterSpacing: -2.8,
  },
  rulerContainer: {
    height: 200,
    flexDirection: 'row',
  },
  ruler: {},
  marker: {
    height: 100,
    width: 4,
    borderWidth: 2,
    borderColor: 'red',
    backgroundColor: 'red',
    borderRadius: 2,
    position: 'absolute',
    zIndex: 10,
    right: MID_POINT_X,
    top: 57,
  },
});

export default Scale;
