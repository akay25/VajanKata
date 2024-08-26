import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {H1, SubHeading} from '~/components/Headings';
import InputElement from '~/components/InputElement';
import colors from '~/styles/colors';
import PrimaryButton from '~/components/PrimaryButton';
import AuthLayout from '~/components/AuthLayout';
import {showToast} from '~/components/Toast';
import {sendPasswordResetOTP} from '~/api/auth';

class ForgetPassword extends AuthLayout {
  constructor(props: any) {
    super(props);
    // @ts-ignore
    this.MARGIN_TOP_SMALL = 0;

    this.state = {
      email: '',
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

  callForgetPassword = async () => {
    const formData = {
      email: this.state.email,
    };

    // TODO: Validate form data

    let response = null;
    this.setState({isLoading: true});
    try {
      response = await sendPasswordResetOTP(formData);
    } catch (e: any) {
      this.setState({isLoading: false});
      showToast.error('FAILED TO SEND OTP', e.response.data.message);
      return;
    }
    this.setState({isLoading: false});
    showToast.success('SUCCESS', 'OTP sent to registered email');
    this.props.navigation.navigate('EnterOTP');
  };

  content = () => {
    return (
      <>
        <View style={styles.headingContainer}>
          <H1 text="Forget password" />
          <SubHeading text="Enter your email ID we will send you OTP to reset your password" />
        </View>
        <View style={styles.inputContainer}>
          <InputElement
            icon="mail"
            label="Email"
            placeholder="Enter email"
            value={this.state.email}
            onTextChange={e => this.setState({email: e})}
          />
          <PrimaryButton
            style={{marginTop: 20}}
            text="Send OTP"
            disabled={this.state.isLoading}
            onPress={e => this.callForgetPassword()}
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
    flexDirection: 'row',
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

export default ForgetPassword;
