import React, {Component} from 'react';
import {
  ScrollView,
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import colors from '~/styles/colors';

const width = Dimensions.get('window').width;

export const MARGIN_TOP_REGULAR = 0;
export const MARGIN_TOP_SMALL = 10;

export default class AuthLayout extends Component<any, any> {
  constructor(props: any) {
    super(props);

    // @ts-ignore
    this.MARGIN_TOP_REGULAR = props.MARGIN_TOP_REGULAR
      ? props.MARGIN_TOP_REGULAR
      : MARGIN_TOP_REGULAR;
    // @ts-ignore
    this.MARGIN_TOP_SMALL = props.MARGIN_TOP_SMALL
      ? props.MARGIN_TOP_SMALL
      : MARGIN_TOP_SMALL;
    // @ts-ignore
    this.marginTop = new Animated.Value(this.MARGIN_TOP_REGULAR);
  }

  componentDidMount() {
    if (Platform.OS == 'ios') {
      // @ts-ignore
      this.keyboardWillShowSub = Keyboard.addListener(
        'keyboardWillShow',
        this.keyboardWillShow,
      );
      // @ts-ignore
      this.keyboardWillHideSub = Keyboard.addListener(
        'keyboardWillHide',
        this.keyboardWillHide,
      );
    } else {
      // @ts-ignore
      this.keyboardWillShowSub = Keyboard.addListener(
        'keyboardDidShow',
        this.keyboardDidShow,
      );
      // @ts-ignore
      this.keyboardWillHideSub = Keyboard.addListener(
        'keyboardDidHide',
        this.keyboardDidHide,
      );
    }
  }

  componentWillUnmount() {
    // @ts-ignore
    this.keyboardWillShowSub.remove();
    // @ts-ignore
    this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = (event: any) => {
    // @ts-ignore
    Animated.timing(this.marginTop, {
      useNativeDriver: false,
      duration: event.duration,
      // @ts-ignore
      toValue: this.MARGIN_TOP_SMALL,
    }).start();
  };

  keyboardWillHide = (event: any) => {
    // @ts-ignore
    Animated.timing(this.marginTop, {
      useNativeDriver: false,
      duration: event.duration,
      // @ts-ignore
      toValue: this.MARGIN_TOP_REGULAR,
    }).start();
  };

  keyboardDidShow = (event: any) => {
    // @ts-ignore
    Animated.timing(this.marginTop, {
      useNativeDriver: false,
      // @ts-ignore
      toValue: this.MARGIN_TOP_SMALL,
    }).start();
  };

  keyboardDidHide = (event: any) => {
    // @ts-ignore
    Animated.timing(this.marginTop, {
      useNativeDriver: false,
      // @ts-ignore
      toValue: this.MARGIN_TOP_REGULAR,
    }).start();
  };

  getHeaderImage = () => {
    return require('~/assets/images/LoginHeader.png');
  };

  getHeaderImageHeight = () => Dimensions.get('window').height * 0.42;

  beforeRender = () => {};

  content = () => {
    return <></>;
  };

  renderStatusBar = () => {
    return (
      <StatusBar
        animated={true}
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
        translucent={true}
      />
    );
  };

  render() {
    this.beforeRender();
    return (
      <>
        {this.renderStatusBar()}
        <SafeAreaView style={styles.container}>
          {/** Banner Image */}
          <Animated.Image
            source={this.getHeaderImage()}
            style={{
              width: width,
              height: this.getHeaderImageHeight(),
              zIndex: 0,
              // @ts-ignore
              marginTop: this.marginTop,
            }}
          />
          <ScrollView
            style={styles.controlContainer}
            showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView behavior="padding">
              {this.content()}
            </KeyboardAvoidingView>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  controlContainer: {
    flex: 1,
    margin: 24,
    zIndex: 10,
    backgroundColor: colors.WHITE,
  },
});
