import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';

import {H1, SubHeading} from '~/components/Headings';
import InputElement from '~/components/InputElement';
import colors from '~/styles/colors';
import PrimaryButton from '~/components/PrimaryButton';
import AuthLayout from '~/components/AuthLayout';
import fonts from '~/styles/fonts';
import OTPElement from '~/components/OTPElement';

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
          <H1 text="Reset password" />
          <SubHeading text="Your new password must be different from your previous password" />
        </View>
        <View style={styles.inputContainer}>
          <InputElement
            icon="lock"
            label="New password"
            placeholder="Enter your new password"
            value={this.state.email}
            onTextChange={e => this.setState({email: e})}
            isPasswordField={true}
          />
          <InputElement
            style={{marginTop: 14}}
            icon="lock"
            label="Confirm Password"
            placeholder="Enter same password again"
            value={this.state.email}
            onTextChange={e => this.setState({email: e})}
            isPasswordField={true}
          />
          <PrimaryButton
            style={{marginTop: 20}}
            text="Reset Password"
            onPress={e => {
              console.log('Make api call to reset password');
            }}
          />
          <View style={styles.registerContainer}>
            <Text style={styles.registerMessageText}>
              Once password is changed successfully, you'll be taken to
              dashboard
            </Text>
          </View>
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
