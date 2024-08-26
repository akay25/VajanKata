import React from 'react';
import {View, Text, StyleSheet, ViewStyle} from 'react-native';

// Local imports
import COLORS from '~/styles/colors';
import Icon from './FeatherIcon';

interface BackButtonProps {
  customStyle?: ViewStyle;
}

const BackButton = (props: BackButtonProps) => {
  // TODO: Add method to go back later
  return (
    <View style={[styles.backButtonContainer, props.customStyle]}>
      <Icon name="chevrons-left" size={20} color={COLORS.BLACK} />
      <Text style={styles.text}>Back</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  backButtonContainer: {
    width: 110,
    height: 45,
    backgroundColor: COLORS.WHITE,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 20,
    color: COLORS.BLACK,
  },
});

export default BackButton;
