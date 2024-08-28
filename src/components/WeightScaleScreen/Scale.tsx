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
import {observer, inject} from 'mobx-react';

// Local imports
import COLORS from '~/styles/colors';
import FONTS from '~/styles/fonts';
import Bar from './Bar';
import {DEVICE_WIDTH} from '~/constants/device';
import {SPOKE_SOUND} from '~/sounds';
import {SettingsStoreProps} from '~/@types/SettingsStoreProps';

interface ScaleProps extends SettingsStoreProps {
  style?: ViewStyle;
}

const WEIGHT_SECTION_HEIGHT = 100;
const MID_POINT_X = DEVICE_WIDTH / 2 - 8;

const MAX_WEIGHT = 200;
const PARTS_IN_BETWEEN = 10;

let DATA = [];
for (let i = 0; i <= MAX_WEIGHT; i += 10) {
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

const Scale = inject('SettingsStore')(
  observer((props: ScaleProps) => {
    const {SettingsStore} = props;
    const [weight, setWeight] = useState(0.0);
    // TODO: Use this value to display a different scale
    const showKGScale = SettingsStore.display_weight_in_kg;

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
            {parseFloat(SettingsStore.weight + '').toFixed(1)}{' '}
            {SettingsStore.unit}
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
              let newWeight = barCounts; // * 0.1;
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

              SettingsStore.setWeightInG(newWeight * 1000);
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
  }),
);

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
