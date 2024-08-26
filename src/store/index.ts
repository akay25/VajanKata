import { UserStoreModel } from './user';
import { DEFAULT_USER } from '~/constants/user';
import { onSnapshot, onPatch } from 'mobx-state-tree';

// Create new stores here
export const userStore = UserStoreModel.create(DEFAULT_USER);
