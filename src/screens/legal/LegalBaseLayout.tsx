import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from '~/components/FeatherIcon';
import PrimaryButton from '~/components/PrimaryButton';
import colors from '~/styles/colors';

interface LegalBaseLayoutProps {
  heading: string;
  subHeading?: string;
  children: React.ReactNode;
}

const LegalBaseLayout = (props: LegalBaseLayoutProps) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor={colors.LINK_GREEN}
        barStyle={'dark-content'}
        translucent={Platform.OS == 'ios'}
      />
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <Image
            style={styles.leaveImage}
            resizeMode="contain"
            source={require('~/assets/images/BannerLeaves.png')}
          />
          <View style={styles.backButtonContainer}>
            <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
              <Icon name="chevron-left" size={25} color={colors.WHITE} />
            </TouchableOpacity>
          </View>
          <Text style={styles.headerBoxHeading}>{props.heading}</Text>
          <Text style={styles.headerBoxSubHeading}>{props.subHeading}</Text>
        </View>
        <View style={styles.viewContainer}>
          {props.children}
          <PrimaryButton
            style={{marginBottom: 24}}
            text="Accept"
            onPress={handleGoBack}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default LegalBaseLayout;

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: colors.WHITE,
    flex: 1,
  },
  headerContainer: {
    flex: 1,
    height: 138,
    backgroundColor: colors.LINK_GREEN,
    paddingHorizontal: 24,
  },
  leaveImage: {
    // maxHeight: 198,
    height: 150,
    position: 'absolute',
    right: -70,
    bottom: 0,
    opacity: 0.2,
    zIndex: -1,
  },
  headerBoxHeading: {
    fontSize: 16,
    fontFamily: 'Jost-Medium',
    letterSpacing: -0.25,
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 24,
    color: colors.WHITE,
  },
  headerBoxSubHeading: {
    fontSize: 16,
    fontFamily: 'Jost',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: -0.25,
    color: colors.WHITE,
  },
  backButtonContainer: {},
  backButton: {
    borderRadius: 50,
    height: 36,
    width: 36,
    // backgroundColor: '#2d9658',
    backgroundColor: colors.HEADER_BACK_BUTTON,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  viewContainer: {
    marginTop: 20,
    marginHorizontal: 24,
    zIndex: 1,
  },
  tcH: {
    marginTop: 10,
    marginBottom: 10,
    color: colors.DARK_BLUE,
    fontFamily: 'Jost-Medium',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: -0.25,
  },
  tcP: {
    marginTop: 10,
    marginBottom: 10,
    color: colors.DARK_GRAY,
    fontFamily: 'Jost',
    fontSize: 14,
    letterSpacing: -0.25,
  },
  tcL: {
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    color: colors.DARK_GRAY,
    fontFamily: 'Jost',
    fontSize: 14,
    letterSpacing: -0.25,
  },
});
