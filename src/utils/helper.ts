import { Alert, BackHandler, PermissionsAndroid } from "react-native";

export const console_log = (...args: any) => {
  if (__DEV__) {
    console.log(...args);
  }
};

export const generateRandomNumber = (min: number = 0, max: number): number => {
  return Math.floor((Math.random() * max) + min);
}

export const getCurrentTime = () => {
  return new Date();
};

export const AsyncAlert = (title: string, msg: string) => new Promise((resolve) => {
  Alert.alert(
    title,
    msg,
    [
      {
        text: 'ok',
        onPress: () => {
          resolve('YES');
        },
      },
    ],
    { cancelable: false },
  );
});


export const requestAccessFineLocationPermission = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'Access fine location required for discovery',
      message:
        'In order to perform discovery, you must enable/allow ' +
        'fine location access.',
      buttonNeutral: 'Ask Me Later"',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK'
    }
  );
  return granted === PermissionsAndroid.RESULTS.GRANTED;
};

export const ExitAlert = (title: string, msg: string) => {
  Alert.alert(
    title,
    msg,
    [
      { text: 'Exit', onPress: () => BackHandler.exitApp() },
    ]
  );
}

export const getWeightInKgs = (weight_in_g: number) => {
  return weight_in_g / 1000.0;
}

export const getWeightInPounds = (weight_in_g: number) => {
  return weight_in_g * 0.00220462;
}

export const getRoundUpValue = (weight: number) => {
  return parseFloat(weight + '').toFixed(1);
}