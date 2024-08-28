import { SettingsStoreModel } from './settings';
import { DEFAULT_SETTINGS } from '~/constants/settings';
import { onSnapshot, onPatch } from 'mobx-state-tree';

// Create new stores here
export const settingsStore = SettingsStoreModel.create(DEFAULT_SETTINGS);