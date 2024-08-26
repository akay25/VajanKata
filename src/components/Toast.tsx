import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Toast from 'react-native-toast-message';
import {MAX_TOAST_DURATION_IN_MS} from '~/constants/limits';
import colors from '~/styles/colors';
import Icon from './FeatherIcon';

const _showToast = (
  text_: string,
  subText: string = '',
  type = 'success',
  timeout = MAX_TOAST_DURATION_IN_MS,
  offset = 70,
) => {
  return Toast.show({
    text1: text_,
    text2: subText,
    type: type,
    position: 'top',
    visibilityTime: timeout,
    bottomOffset: offset,
  });
};

interface IShowToastProps {
  title: string;
  subText?: string;
  timeout?: number;
}

export const showToast = {
  success: (
    title: string,
    subText: string = '',
    timeout: number = MAX_TOAST_DURATION_IN_MS,
  ) => _showToast(title, subText, 'success', timeout),
  error: (
    title: string,
    subText: string = '',
    timeout: number = MAX_TOAST_DURATION_IN_MS,
  ) => _showToast(title, subText, 'error', timeout),
  info: (
    title: string,
    subText: string = '',
    timeout: number = MAX_TOAST_DURATION_IN_MS,
  ) => _showToast(title, subText, 'info', timeout),
  notification: (
    title: string,
    subText: string = '',
    timeout: number = MAX_TOAST_DURATION_IN_MS,
  ) => _showToast(title, subText, 'notification', timeout),
};

const toastConfig = {
  success: (internalState: any) => (
    <View style={toastStyle.toastContainer}>
      <View style={toastStyle.iconContainer}>
        <View style={toastStyle.iconCircle}>
          <Icon
            style={toastStyle.icon}
            name="check"
            size={30}
            color={colors.PRIMARY}
          />
        </View>
      </View>
      <View style={toastStyle.textContainer}>
        <Text style={[toastStyle.headingText, {color: colors.PRIMARY}]}>
          {internalState.text1}
        </Text>
        <Text style={toastStyle.subText}>{internalState.text2}</Text>
      </View>
    </View>
  ),
  error: (internalState: any) => (
    <View style={toastStyle.toastContainer}>
      <View style={[toastStyle.iconContainer, {backgroundColor: colors.RED}]}>
        <View style={toastStyle.iconCircle}>
          <Icon
            style={toastStyle.icon}
            name="alert-circle"
            size={32}
            color={colors.RED}
          />
        </View>
      </View>
      <View style={toastStyle.textContainer}>
        <Text style={[toastStyle.headingText, {color: colors.RED}]}>
          {internalState.text1}
        </Text>
        <Text style={toastStyle.subText}>{internalState.text2}</Text>
      </View>
    </View>
  ),
  info: () => {},
  notification: (internalState: any) => (
    <View style={toastStyle.notificationToastContainer}>
      <Text style={toastStyle.headingText}>{internalState.text1}</Text>
    </View>
  ),
};

export default () => (
  // @ts-ignore
  <Toast config={toastConfig} />
  // TODO: Add ref for handling on tap
);

const toastStyle = StyleSheet.create({
  toastContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 60,
    width: '90%',
    padding: 8,
    borderWidth: 0.7,
    borderColor: colors.DARK_GREEN,
    borderRadius: 8,
    backgroundColor: '#eaffea',
    // colors.BEIGE,
  },
  iconContainer: {
    width: 44,
    height: 44,
    backgroundColor: colors.PRIMARY,
    borderRadius: 5,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    height: 32,
    width: 32,
    borderRadius: 20,
    backgroundColor: colors.WHITE,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {},
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginLeft: 10,
  },
  headingText: {
    fontSize: 13,
    fontFamily: 'Jost-Medium',
    letterSpacing: -0.25,
    fontStyle: 'normal',
    fontWeight: '800',
  },
  subText: {
    color: colors.DARK_GRAY,
    fontSize: 13,
    fontFamily: 'Jost-Medium',
    letterSpacing: -0.25,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  // NOTE: Not used at the moment
  notificationToastContainer: {
    // backgroundColor: PRIMARY.BACKGROUND,
    flex: 1,
    padding: 8,
    textAlign: 'center',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
});
