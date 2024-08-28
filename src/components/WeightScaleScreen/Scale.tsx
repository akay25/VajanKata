import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  FlatList,
  Vibration,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {observer, inject} from 'mobx-react';

// Local imports
import COLORS from '~/styles/colors';
import FONTS from '~/styles/fonts';
import Bar from './Bar';
import {DEVICE_WIDTH} from '~/constants/device';
import {MAX_WEIGHT, WEIGHT_DATA} from '~/constants/scale';
import {SPOKE_SOUND} from '~/sounds';
import {SettingsStoreProps} from '~/@types/SettingsStoreProps';
import {INSULTS} from '~/constants/insults';

interface ScaleProps extends SettingsStoreProps {
  style?: ViewStyle;
}

const MID_POINT_X = DEVICE_WIDTH / 2 - 8;
const WEIGHT_SECTION_HEIGHT = 100;

const Scale = inject('SettingsStore')(
  observer((props: ScaleProps) => {
    // Set interval
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const {SettingsStore} = props;
    const [weight, setWeight] = useState(0.0);
    const [insult, setInsult] = useState('Swipe and tap on weight');
    // TODO: Use this value to display a different scale
    const showKGScale = SettingsStore.display_weight_in_kg;

    useEffect(() => {
      return () => {
        SPOKE_SOUND.stop();
        SPOKE_SOUND.release();
      };
    }, []);

    const calculateInsult = () => {
      const bmi = SettingsStore.calculateBMI();
      let insultsList = [];
      if (bmi <= 19) {
        // Select from LOW
        insultsList = INSULTS['LOW'];
      } else if (bmi > 20 && bmi <= 26) {
        // Select from MID
        insultsList = INSULTS['MID'];
      } else if (bmi > 26) {
        // Select from HIGH
        insultsList = INSULTS['HIGH'];
      }

      // Select one randomly
      const randomIndex = Math.floor(Math.random() * insultsList.length);
      setInsult(insultsList[randomIndex]);
    };

    return (
      <View style={[styles.scaleContainer, props.style]}>
        <View style={styles.promptContainer}>
          <Text style={styles.promptText}>{insult}</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => calculateInsult()}>
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
              {SettingsStore.weight} {SettingsStore.unit}
            </Text>
          </View>
        </TouchableWithoutFeedback>
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
            data={WEIGHT_DATA}
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

                // Clear interval
                if (intervalRef.current) {
                  clearInterval(intervalRef.current);
                }

                // Set new interval
                intervalRef.current = setTimeout(() => {
                  calculateInsult();
                }, 600);
              }
              setWeight(newWeight);
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
  promptContainer: {
    height: WEIGHT_SECTION_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  promptText: {
    textAlign: 'center',
    fontSize: 24,
    fontFamily: FONTS.subHeading,
    color: COLORS.DARK_GRAY,
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
