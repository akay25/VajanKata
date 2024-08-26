import React from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import WateringIMG from '~/assets/images/watering.png';
import colors from '~/styles/colors';
import fonts from '~/styles/fonts';
import Icon from '~/components/FeatherIcon';

export function Welcome() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Chettu</Text>
      <Image source={WateringIMG} style={styles.image} resizeMode="contain" />
      <Text style={styles.description}>
        Let us sprinkle reminders, so you only water when it matters!
      </Text>
      <View style={styles.nextButtonContainer}>
        <TouchableOpacity
          style={styles.button}
          // @ts-ignore
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.7}>
          <Text>
            <Icon name="chevron-right" color="#fff" size={24} />
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 25,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    color: colors.HEADING,
    fontSize: 32,
    textAlign: 'center',
    lineHeight: 38,
    fontFamily: fonts.heading,
  },
  image: {
    height: Dimensions.get('window').width * 0.7,
  },
  description: {
    fontSize: 18,
    lineHeight: 25,
    textAlign: 'center',
    color: colors.HEADING,
    fontFamily: fonts.text,
  },
  nextButtonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 10,
    backgroundColor: colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
