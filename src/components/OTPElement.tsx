import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import OtpInputs from 'react-native-otp-inputs';
import Icon from './FeatherIcon';
import colors from '~/styles/colors';
import fonts from '~/styles/fonts';

interface OTPElementProps {
  icon: string;
  label: string;
  value: string;
  count?: number;
  onChange?: (text: string) => void;
  style?: any;
}

{
  /* <View style={styles.OTPContainer}>
            
            {/* {error && error.key == 'otp' ? (
              <Text style={styles.errorText}>{error.message}</Text>
            ) : null} */
}
// </View> */}

const DEFAULT_OTP_COUNT = 6;

const OTPElement = (props: OTPElementProps) => {
  const [inputValue, setInputValue] = useState(props.value);

  useEffect(() => {
    if (!props.onChange) return;
    props.onChange(inputValue);
  }, [inputValue]);

  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.labelContainer}>
        <Icon name={props.icon} size={20} color={colors.DARK_GRAY} />
        <Text style={styles.labelText}>{props.label}</Text>
      </View>
      <OtpInputs
        autofillFromClipboard={false}
        handleChange={otp => console.log('thios is otp: ', otp)}
        numberOfInputs={6}
        // ref={this.otpRef}
        keyboardType="phone-pad"
        inputStyles={styles.OTPDigitInput}
        inputContainerStyles={styles.OTPDigitInputContainer}
        selectTextOnFocus={false}
      />
    </View>
  );
};

export default OTPElement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: ,
  },
  labelContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 6,
  },
  labelText: {
    marginLeft: 8,
    color: colors.DARK_GRAY,
    fontFamily: 'Jost',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.25,
    textTransform: 'capitalize',
  },
  OTPDigitInputContainer: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ECECEC',
    height: 46,
    width: 46,
    backgroundColor: '#FBF6EE',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  OTPDigitInput: {
    marginTop: 16,
    height: 42,
    fontFamily: fonts.JOST,
    fontSize: 25,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0.25,
    color: colors.DARK_GRAY,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
