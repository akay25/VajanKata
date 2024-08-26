import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

// Local imports
import Icon from './FeatherIcon';
import COLORS from '~/styles/colors';
import {BUTTON} from '~/styles/generic';

const ChartButton = () => {
  return (
    <View>
      <TouchableOpacity style={styles.chartButton} onPress={() => {}}>
        <Icon name="pie-chart" color={COLORS.WHITE} size={22} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  chartButton: {
    width: BUTTON.HEIGHT,
    height: BUTTON.HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BUTTON.BORDER_RADIUS,
    backgroundColor: COLORS.SECONDARY,
  },
});

export default ChartButton;
