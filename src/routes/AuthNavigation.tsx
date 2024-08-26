import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {Welcome} from '~/screens/Welcome';
import Registration from '~/screens/auth/Registration';
import Login from '~/screens/auth/Login';
import ForgetPassword from '~/screens/auth/ForgetPassword/Screen1';
import EnterOTP from '~/screens/auth/ForgetPassword/Screen2';
import PasswordReset from '~/screens/auth/ForgetPassword/Screen3';
import TermsAndConditionsScreen from '~/screens/legal/TermsAndConditions';
import PrivacyAndPolicyScreen from '~/screens/legal/PrivacyAndPolicy';

const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Registration} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="EnterOTP" component={EnterOTP} />
      <Stack.Screen name="PasswordReset" component={PasswordReset} />
      <Stack.Screen
        name="TermsAndConditions"
        component={TermsAndConditionsScreen}
      />
      <Stack.Screen
        name="PrivacyAndPolicy"
        component={PrivacyAndPolicyScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
