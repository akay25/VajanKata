import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

import { PlantSelect } from '~/screens/PlantSelect';
import { MyPlants } from '~/screens/MyPlants';

const BottomTab = createBottomTabNavigator();

export function RoutesBottomTab() {
  return (
    <BottomTab.Navigator
      initialRouteName="PlantSelect"
      screenOptions={{
        "tabBarActiveTintColor": "#32B768",
        "tabBarInactiveTintColor": "#AAB2AD",
        "tabBarIconStyle": {
          "alignItems": "center"
        },
        "tabBarLabelPosition": "beside-icon",
        "tabBarStyle": [
          {
            "display": "flex"
          },
          null
        ]
      }}
    >
      <BottomTab.Screen
        name="PlantSelect"
        options={{
          headerStyle: { height: 0 },
          title: "",
          tabBarIcon: ({ focused }) => (
            <Icon
              name="activity"
              color={focused ? '#32B768' : '#AAB2AD'}
              size={22}
            />
          ),
        }}
        component={PlantSelect}
      />
      <BottomTab.Screen
        name="MyPlants"
        options={{
          headerStyle: { height: 0 },
          title: "",
          tabBarIcon: ({ focused }) => (
            <Icon
              name="list"
              color={focused ? '#32B768' : '#AAB2AD'}
              size={20}
            />
          ),
        }}
        component={MyPlants}
      />
    </BottomTab.Navigator>
  );
}
