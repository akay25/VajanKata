import React from 'react';
import {View, Image, Text, StyleSheet, Dimensions} from 'react-native';

import WaterImage from '~/assets/images/waterdrop.png';
import colors from '~/styles/colors';

type IBoxProps = {
  otherPosition?: boolean;
};

export function BoxWater({otherPosition}: IBoxProps) {
  return (
    <View style={[styles.nextPlant, otherPosition && {marginTop: -45}]}>
      <Image source={WaterImage} style={{height: 56, width: 56}} />
      <Text style={styles.nextPlantText}>
        Regue sua Aningapara{'\n'}daqui a 2 horas
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  nextPlant: {
    height: 88,
    width: Dimensions.get('window').width * 0.85,
    borderRadius: 20,
    backgroundColor: '#E6F1FA',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    marginTop: 30,
    marginBottom: 30,
  },
  nextPlantText: {
    fontSize: 15,
    lineHeight: 23,
    color: colors.blue,
    marginLeft: 20,
  },
});
