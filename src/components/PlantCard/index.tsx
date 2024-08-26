import React, { useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import FlipCard from 'react-native-flip-card';

import colors from '~/styles/colors';
import ConnectionLed from './ConnectionLed';
import GraphStats from './GraphStats';

interface IPlantCardPrimary {
  image: string;
  title: string;
  onPress: () => void;
}

export function PlantCardPrimary({ image, title, onPress }: IPlantCardPrimary) {
  const [flipped, setFlipped] = useState(false);

  // handle press events
  const handleLongPress = () => {
    setFlipped(!flipped);
  }

  const handlePress = () => {
    if (!flipped) {
      onPress();
    } else {
      setFlipped(!flipped);
    }
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      onLongPress={handleLongPress}
      activeOpacity={1}
    >
      <View style={styles.imageContainer}>
        <FastImage
          style={styles.image}
          source={{
            uri: image,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
      <FlipCard
        style={styles.flipOverlay}
        flipHorizontal={true}
        flipVertical={false}
        friction={6}
        useNativeDriver={true}
        clickable={false}
        flip={flipped}
      >
        {/* Face Side */}
        <View style={styles.controlHolder}>
          <Text style={styles.title}>{title}</Text>
          <ConnectionLed connected={false} transferringData={true} />
        </View>
        {/* Back Side */}
        <GraphStats plantId={1} />
      </FlipCard>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 219,
    width: 155,
    borderRadius: 20,
    backgroundColor: colors.flavored_background,
    margin: 10,
    borderWidth: 1,
    borderColor: colors.beige,
    overflow: 'hidden'
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    height: 196, // 219 - 25
    top: 25,
    left: 25,
    position: 'absolute',
    zIndex: 0
  },
  image: {
    flex: 1,
    width: '100%',
    height: 'auto',
  },
  flipOverlay: {
    flex: 1,
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    position: 'absolute',
  },
  controlHolder: {
    height: '25%', // 219 / 4 = 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 8,
  },
  title: {
    marginTop: 7,
    marginLeft: 4,
    fontWeight: '700',
    fontSize: 15,
    color: colors.heading,
  },
});
