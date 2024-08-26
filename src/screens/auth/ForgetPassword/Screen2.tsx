import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {H1, SubHeading} from '~/components/Headings';
import InputElement from '~/components/InputElement';
import colors from '~/styles/colors';
import PrimaryButton from '~/components/PrimaryButton';
import AuthLayout from '~/components/AuthLayout';
import fonts from '~/styles/fonts';
import OTPElement from '~/components/OTPElement';
import Anchor from '~/components/Anchor';

class PasswordReset extends AuthLayout {
  constructor(props: any) {
    super(props);
    // @ts-ignore
    this.MARGIN_TOP_SMALL = 0;

    this.state = {
      email: '',
      password: '',
      isLoading: false,
      error: {
        key: '',
        message: '',
      },
      isSubmitButtonPressed: false,
    };
  }

  getHeaderImage = () => {
    return require('~/assets/images/ForgetPassword.png');
  };

  getHeaderImageHeight = () => Dimensions.get('window').height * 0.42;

  content = () => {
    return (
      <>
        <View style={styles.headingContainer}>
          <H1 text="Password Recovery Code" />
          <SubHeading text="We have sent 6 digit password recovery code to your email ID. Enter the code to proceed" />
        </View>
        <View style={styles.inputContainer}>
          <OTPElement
            style={{marginBottom: 14}}
            icon="lock"
            label="Enter OTP"
            value="sss"
            count={6}
          />
          <View style={styles.registerContainer}>
            <Anchor
              style={{}}
              text="Didn't receive an OTP? Resend code"
              color={colors.SECONDARY}
              size={14}
              onPress={() => {
                this.props.navigation.navigate('ForgetPassword');
              }}
            />
          </View>
          <PrimaryButton
            style={{marginTop: 20}}
            text="Reset Password"
            onPress={e => {
              console.log('Make api call to reset password');
              this.props.navigation.navigate('PasswordReset');
            }}
          />
        </View>
      </>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    margin: 0,
    backgroundColor: colors.WHITE,
  },
  controlContainer: {
    flex: 1,
    margin: 24,
  },
  headingContainer: {},
  inputContainer: {
    marginTop: 36,
  },
  registerContainer: {
    marginTop: 6,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  registerMessageText: {
    fontFamily: 'Jost',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.25,
    color: colors.LIGHT_GRAY,
  },
});

export default PasswordReset;
