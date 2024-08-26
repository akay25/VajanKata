import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from '~/components/FeatherIcon';
import {Plant} from '~/screens/Plant';
import {RoutesBottomTab} from './bottomtabs.routes';

const Stack = createStackNavigator();

export function Routes() {
  return (
    <Stack.Navigator initialRouteName="RoutesBottomTab">
      <Stack.Screen
        name="RoutesBottomTab"
        options={{headerShown: false}}
        component={RoutesBottomTab}
      />
      <Stack.Screen
        name="Plant"
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#F0F0F0',
            elevation: 0,
          },
          headerBackImage: () => (
            <Icon name="chevrons-left" color="#52665A" size={30} />
          ),
        }}
        component={Plant}
      />
    </Stack.Navigator>
  );
}
