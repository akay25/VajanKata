import React from 'react';
import {View, StyleSheet, Text, Platform, Dimensions} from 'react-native';
import {inject, observer} from 'mobx-react';

import {DEVICE_HEIGHT} from '~/constants/device';
import {H1, SubHeading} from '~/components/Headings';
import InputElement from '~/components/InputElement';
import Anchor from '~/components/Anchor';
import colors from '~/styles/colors';
import PrimaryButton from '~/components/PrimaryButton';
import fonts from '~/styles/fonts';
import AuthLayout from '~/components/AuthLayout';
import {showToast} from '~/components/Toast';
import {LOGIN_SCHEMA} from '~/validations/auth';
import {validateYupSchema} from '~/validations';
import {signin} from '~/api/auth';

//@ts-ignore
@inject('UserStore')
@observer
class Login extends AuthLayout {
  constructor(props: any) {
    super(props);
    // @ts-ignore
    this.MARGIN_TOP_SMALL = 0;

    this.state = {
      email: '',
      password: '',
      isLoading: false,
      errors: {
        email: undefined,
        password: undefined,
      },
      isLoginPressed: false,
    };
  }

  getHeaderImage = () => {
    return require('~/assets/images/LoginHeader.png');
  };

  getHeaderImageHeight = () => Dimensions.get('window').height * 0.42;

  doSignin = async () => {
    const formData = {
      email: this.state.email,
      password: this.state.password,
    };

    // Add validation here
    const errors = await validateYupSchema(LOGIN_SCHEMA, formData);
    if (!!errors) {
      this.setState({errors});
      return;
    }

    const loginData = {
      ...formData,
      // TODO: Add process to fetch fcmtoken later
      fcmToken: 'random-fcm-token',
      platform: Platform.OS,
    };

    let response = null;
    this.setState({isLoading: true});
    try {
      response = await signin(loginData);
    } catch (e: any) {
      this.setState({isLoading: false});
      showToast.error('LOGIN FAILED', e.response.data.message);
      return;
    }

    this.setState({isLoading: false});
    const responseData = response.data.data;

    // NOTE: Module to add verification logic later
    // Check for verified profile, then re-direct to login screen
    // if (!responseData.user.is_verified) {
    //   alert('You have to verify before you can continue');
    //   this.props.navigation.navigate('Verify');
    // }

    showToast.success('SUCCESS', 'Login successful');

    this.props.UserStore.init(responseData.user, responseData.token);
  };

  content = () => {
    const {errors} = this.state;

    return (
      <>
        <View style={styles.headingContainer}>
          <H1 text="Welcome back" />
          <SubHeading text="Login here and watch your garden thrive" />
        </View>
        <View style={styles.inputContainer}>
          <InputElement
            icon="mail"
            label="Email"
            placeholder="Enter email"
            value={this.state.email}
            onTextChange={e => this.setState({email: e})}
            errorText={errors['email']}
          />
          <InputElement
            style={{marginTop: 14}}
            icon="lock"
            label="Password"
            placeholder="Enter password"
            isPasswordField={true}
            value={this.state.password}
            onTextChange={e => this.setState({password: e})}
            errorText={errors['password']}
          />
          <View style={styles.forgotPasswordContainer}>
            <Anchor
              style={{marginTop: 4}}
              text="Forgot Password"
              color={colors.SECONDARY}
              size={14}
              onPress={() => {
                this.props.navigation.navigate('ForgetPassword');
              }}
            />
          </View>
          <PrimaryButton
            style={{marginTop: 20}}
            text="Login"
            onPress={e => this.doSignin()}
            disabled={this.state.isLoading}
          />
          <View style={styles.registerContainer}>
            <Text style={styles.registerMessageText}>
              Don't have an account?{' '}
            </Text>
            <Anchor
              style={{marginTop: 0}}
              text="Register Now"
              color={colors.SECONDARY}
              size={14}
              onPress={() => {
                // @ts-ignore
                this.props.navigation.navigate('Register');
              }}
            />
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
  bannerContainer: {
    flex: 1,
    marginTop: -20,
    width: '100%',
    maxHeight: DEVICE_HEIGHT * 0.4,
  },
  controlContainer: {
    flex: 1,
    margin: 24,
  },
  headingContainer: {},
  inputContainer: {
    marginTop: 36,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 6,
  },
  disclaimerContainer: {
    flexDirection: 'row',
  },
  disclaimerText: {
    color: colors.DARK_GRAY,
    fontFamily: fonts.JOST,
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.25,
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

export default Login;
