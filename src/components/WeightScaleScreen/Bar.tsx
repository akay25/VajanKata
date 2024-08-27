import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import COLORS from '~/styles/colors';
import FONTS from '~/styles/fonts';

interface BarProps {
  int: number;
  dec: number;
  isMaxWeight?: boolean;
}

const BAR_HEIGHT = 100;
const BAR_WIDTH = 5;
const BAR_SPACE = 10;
const BAR_CORNER_RADIUS = 5;

const Bar = (props: BarProps) => {
  if (props.dec == 0) {
    return (
      <View style={styles.container}>
        {!props.isMaxWeight && (
          <Text style={styles.scaleReading}>{props.int}</Text>
        )}
        <View
          style={[
            styles.intBar,
            {
              marginRight: !props.isMaxWeight ? BAR_SPACE : 0,
              marginTop: props.isMaxWeight ? 12 : 0,
            },
          ]}></View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {props.dec % 2 == 0 ? (
        <View style={styles.evenDecBar}></View>
      ) : (
        <View style={styles.oddDecBar}></View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scaleReading: {
    alignSelf: 'flex-start',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: FONTS.subHeading,
    color: COLORS.GRAY,
  },
  intBar: {
    height: BAR_HEIGHT,
    width: BAR_WIDTH,
    backgroundColor: COLORS.PRIMARY,
    // marginRight: BAR_SPACE,
    borderRadius: BAR_CORNER_RADIUS,
    alignSelf: 'flex-start',
  },
  oddDecBar: {
    height: BAR_HEIGHT * 0.4,
    width: BAR_WIDTH / 2,
    backgroundColor: COLORS.PRIMARY,
    marginRight: BAR_SPACE,
    borderRadius: BAR_CORNER_RADIUS,
  },
  evenDecBar: {
    height: BAR_HEIGHT * 0.7,
    width: BAR_WIDTH / 2,
    backgroundColor: COLORS.PRIMARY,
    marginRight: BAR_SPACE,
    borderRadius: BAR_CORNER_RADIUS,
  },
});

export default Bar;
