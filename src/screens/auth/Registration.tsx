import React from 'react';
import {View, StyleSheet, Text, Dimensions, Platform} from 'react-native';
import {inject, observer} from 'mobx-react';
import {DEVICE_HEIGHT} from '~/constants/device';
import {H1, SubHeading} from '~/components/Headings';
import InputElement from '~/components/InputElement';
import Anchor from '~/components/Anchor';
import colors from '~/styles/colors';
import PrimaryButton from '~/components/PrimaryButton';
import fonts from '~/styles/fonts';
import AuthLayout from '~/components/AuthLayout';
import {signup} from '~/api/auth';
import {showToast} from '~/components/Toast';

//@ts-ignore
@inject('UserStore')
@observer
class Registration extends AuthLayout {
  constructor(props: any) {
    super(props);
    // @ts-ignore
    this.MARGIN_TOP_SMALL = 0;

    this.state = {
      email: '',
      password: '',
      name: '',
      isLoading: false,
      error: {
        key: '',
        message: '',
      },
      isSubmitPressed: false,
    };
  }

  getHeaderImage = () => {
    return require('~/assets/images/RegisterHeader.png');
  };

  getHeaderImageHeight = () => Dimensions.get('window').height * 0.32;

  doSignup = async () => {
    const formData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      fcmToken: 'random-fcm-token',
      platform: Platform.OS,
    };

    // TODO: Validate form data

    let response = null;
    this.setState({isLoading: true});
    try {
      response = await signup(formData);
    } catch (e: any) {
      this.setState({isLoading: false});
      showToast.error('REGISTRATION FAILED', e.response.data.message);
      return;
    }

    this.setState({isLoading: false});
    const responseData = response.data.data;
    showToast.success(
      'SUCCESS',
      'Registration successful, redirecting to dashboard',
    );
    this.props.UserStore.init(responseData.user, responseData.token);
  };

  content = () => {
    return (
      <>
        <View style={styles.headingContainer}>
          <H1 text="Register" />
          <SubHeading text="New here? Plant enthusiasts, register for your green haven" />
        </View>
        <View style={styles.inputContainer}>
          <InputElement
            icon="user"
            label="Name"
            placeholder="Enter name"
            value={this.state.name}
            onTextChange={e => this.setState({name: e})}
          />
          <InputElement
            style={{marginTop: 14}}
            icon="mail"
            label="Email"
            placeholder="Enter email"
            value={this.state.email}
            onTextChange={e => this.setState({email: e})}
          />
          <InputElement
            style={{marginTop: 14}}
            icon="lock"
            label="Password"
            placeholder="Enter password"
            isPasswordField={true}
            value={this.state.password}
            onTextChange={e => this.setState({password: e})}
          />
          <View style={[styles.disclaimerContainer, {marginTop: 10}]}>
            <Text style={styles.disclaimerText}>
              By signing up you agree to our{' '}
            </Text>
            <Anchor
              style={{marginTop: 2}}
              text="terms & conditions"
              color={colors.LINK_GREEN}
              size={16}
              onPress={() => {
                // @ts-ignore
                this.props.navigation.navigate('TermsAndConditions');
              }}
            />
            <Text style={styles.disclaimerText}> and </Text>
          </View>
          <View style={styles.disclaimerContainer}>
            <Anchor
              style={{marginTop: 2}}
              text="privacy policy"
              color={colors.LINK_GREEN}
              size={16}
              onPress={() => {
                // @ts-ignore
                this.props.navigation.navigate('PrivacyAndPolicy');
              }}
            />
            <Text style={styles.disclaimerText}>.</Text>
          </View>
          <PrimaryButton
            style={{marginTop: 20}}
            text="Register"
            disabled={this.state.isLoading}
            onPress={this.doSignup}
          />
          <View style={styles.registerContainer}>
            <Text style={styles.registerMessageText}>Have an account? </Text>
            <Anchor
              style={{marginTop: 0}}
              text="Login"
              color={colors.SECONDARY}
              size={14}
              onPress={() => {
                // @ts-ignore
                this.props.navigation.navigate('Login');
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
    fontSize: 14,
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
    fontFamily: fonts.JOST,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.25,
    color: colors.LIGHT_GRAY,
  },
});

export default Registration;
