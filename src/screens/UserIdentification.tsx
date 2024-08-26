import React, { useState } from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Platform,
  Keyboard,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import STORAGE from '~/utils/mmkv-storage';
import { Button } from '~/components/Button';
import colors from '~/styles/colors';
import fonts from '~/styles/fonts';
import MMKV_KEYS from '~/constants/mmkv-keys';
import { generateRandomNumber } from '~/utils/helper';

export function UserIdentification() {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!userName);
  }

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputChange(value: string) {
    setIsFilled(!!value);
    setUserName(value);
  }

  async function handleSubmit() {
    if (userName !== '' && userName !== ' ' && userName !== '  ') {
      try {
        STORAGE.set(MMKV_KEYS.USERNAME, JSON.stringify({ username: userName, avatar: generateRandomNumber(1, 5) }));
        navigation.navigate('Confirmation');
      } catch (err) {
        return Alert.alert('Error on saving name');
      }
    } else {
      return Alert.alert('Please enter a valid name');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          onPress={() => Keyboard.dismiss}>
          <View style={styles.wrapper}>
            <Text style={styles.emoji}>{isFilled ? '😄' : '😀'}</Text>

            <Text style={styles.title}>What should we {'\n'}call you</Text>

            <TextInput
              placeholder="Your name"
              style={[
                styles.input,
                (isFocused || isFilled) && { borderBottomColor: colors.green },
              ]}
              onBlur={handleInputBlur}
              onFocus={handleInputFocus}
              keyboardAppearance="dark"
              onChangeText={text => handleInputChange(text)}
            />

            <Button title="Submit" onPress={() => handleSubmit()} />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  wrapper: {
    width: Dimensions.get('window').width * 0.7,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emoji: {
    fontSize: 40,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontFamily: fonts.heading,
    color: colors.heading,
    textAlign: 'center',
    marginTop: 30,
  },
  input: {
    height: 56,
    width: '100%',
    borderBottomColor: '#CFCFCF',
    borderBottomWidth: 2,
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 40,
    fontSize: 17,
    color: colors.heading
  },
});
