import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from './FeatherIcon';
import colors from '~/styles/colors';

interface InputElementProps {
  icon: string;
  label: string;
  value: string;
  isPasswordField?: boolean;
  placeholder?: string;
  errorText?: string;
  onTextChange?: (text: string) => void;
  style?: any;
}

const InputElement = (props: InputElementProps) => {
  const [inputValue, setInputValue] = useState(props.value);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!props.onTextChange) return;
    props.onTextChange(inputValue);
  }, [inputValue]);

  const calculatedPlaceholder = !!props.placeholder
    ? props.placeholder
    : props.label;

  const showError = !!props.errorText;

  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.labelContainer}>
        <Icon
          name={props.icon}
          size={20}
          color={showError ? colors.RED : colors.DARK_GRAY}
        />
        <Text style={[styles.labelText, showError && {color: colors.RED}]}>
          {props.label}
        </Text>
      </View>
      <View style={styles.inputBoxContainer}>
        <TextInput
          style={[styles.inputBox, showError && {borderColor: colors.RED}]}
          placeholder={calculatedPlaceholder}
          placeholderTextColor={colors.LIGHT_GRAY}
          value={inputValue}
          onChangeText={text => setInputValue(text)}
          textContentType={'none'}
          secureTextEntry={!!props.isPasswordField && !showPassword}
          spellCheck={false}
        />
        {!!props.isPasswordField && (
          <View style={styles.passwordShowHideButtonHolder}>
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon
                name={showPassword ? 'eye-off' : 'eye'}
                size={24}
                color={colors.DARK_GRAY}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      {showError && <Text style={styles.errorText}>{props.errorText}</Text>}
    </View>
  );
};

export default InputElement;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
  },
  labelContainer: {
    flexDirection: 'row',
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
  inputBoxContainer: {
    marginTop: 6,
    flexDirection: 'row',
  },
  inputBox: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ECECEC',
    backgroundColor: '#FBF6EE',
    paddingVertical: 13,
    paddingHorizontal: 16,
    height: 46,
    color: colors.DARK_BLUE,
    fontFamily: 'Jost',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0.25,
    textTransform: 'lowercase',
  },
  errorText: {
    marginTop: 4,
    color: colors.RED,
    fontFamily: 'Jost',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  passwordShowHideButtonHolder: {
    position: 'absolute',
    height: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    right: 8,
  },
});
