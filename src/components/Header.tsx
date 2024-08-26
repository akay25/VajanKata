import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

import colors from '~/styles/colors';
import STORAGE from '~/utils/mmkv-storage';
import MMKV_KEYS from '~/constants/mmkv-keys';

type IHeaderProps = {
  firstText: string;
  secondText?: string;
};

export function Header({ firstText, secondText = '' }: IHeaderProps) {
  const [userName, setUserName] = useState('');
  const [avatar, setAvatar] = useState<any>('');

  useEffect(() => {
    async function loadUserName() {
      const value = STORAGE.getString(MMKV_KEYS.USERNAME);
      if (value) {
        const userData = JSON.parse(value);
        setUserName(userData.username);
        switch (userData.avatar) {
          case 1:
            setAvatar(require(`~/assets/images/avatars/1.png`));
            break;
          case 2:
            setAvatar(require(`~/assets/images/avatars/2.png`));
            break;
          case 3:
            setAvatar(require(`~/assets/images/avatars/3.png`));
            break;
          case 4:
            setAvatar(require(`~/assets/images/avatars/4.png`));
            break;
          default:
            setAvatar(require(`~/assets/images/avatars/5.png`));
        }
      }
    }

    (async function () {
      await loadUserName();
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.fistText}>{firstText}</Text>
        <Text style={styles.secondText}>
          {secondText ? secondText : userName}
        </Text>
      </View>
      {avatar !== '' && <FastImage source={avatar} style={styles.avatar} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: '100%',
    backgroundColor: colors.background,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
  },
  fistText: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '400',
    color: colors.heading,
  },
  secondText: {
    fontSize: 32,
    lineHeight: 36,
    fontWeight: 'bold',
    color: colors.heading,
  },
  avatar: {
    height: 56,
    width: 56,
    borderRadius: 50,
    borderWidth: 0.9,
    borderColor: colors.beige,
    backgroundColor: colors.light_green
  },
});
