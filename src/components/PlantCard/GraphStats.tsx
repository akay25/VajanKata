import React from "react";
import { BlurView } from "@react-native-community/blur";
import { View, Text, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/Feather';

import colors from "~/styles/colors";

interface IGraphStats {
  plantId: number;
}

const CHART_COLUMN_COUNT = 2;

const GraphStats = (props: IGraphStats) => {
  const data = [
    {
      icon: "thermometer",
      value: "20°C",
      color: colors.dark_green,
    },
    {
      icon: "droplet",
      value: "20%",
      color: colors.blue,
    },
    {
      icon: "sun",
      value: "23h",
      color: colors.orange,
    },
    {
      icon: "battery",
      value: "75%",
      color: colors.dark_green,
    }
  ];

  const graphSections = () => {
    const generatedViews = [];
    for (let i = 0; i < data.length; i++) {
      generatedViews.push(
        <View style={styles.graphSection} key={i}>
          <Icon name={data[i].icon} size={32} color={data[i].color} />
          <Text style={{ ...styles.statValueText, color: data[i].color }}>{data[i].value}</Text>
        </View>
      )
    }

    return generatedViews;
  }

  return (
    <>
      <BlurView
        style={styles.blurContainer}
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      />
      <View style={styles.graphContainer}>
        {graphSections()}
      </View >
    </>
  );
}

export default GraphStats;

const styles = StyleSheet.create({
  blurContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  graphContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    paddingHorizontal: 6,
    backgroundColor: 'white'
  },
  graphSection: {
    width: '85%',
    margin: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statValueText: {
    fontSize: 22,
  }
});