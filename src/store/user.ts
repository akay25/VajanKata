import { types, flow } from "mobx-state-tree";
import MMKV_KEYS from "~/constants/mmkv-keys";
import { DEFAULT_USER } from "~/constants/user";
import storage from "~/utils/mmkv-storage";

export const UserStoreModel = types
  .model({
    email: types.maybeNull(types.string),
    first_name: types.maybeNull(types.string),
    is_disabled: types.maybeNull(types.boolean),
    is_verified: types.maybeNull(types.boolean),
    token: types.maybeNull(types.string),

    // Private methods
    isLoading: types.optional(types.boolean, false)
  })
  .actions(self => ({
    init(newUser: any, token: string) {
      self.email = newUser.email
      self.first_name = newUser.first_name;
      self.is_disabled = newUser.is_disabled;
      self.is_verified = newUser.is_verified;

      // TODO: Save token to localstorage
      self.token = token;
      this.saveTokenToDevice();
    },
    logout() {
      // Perform logout
    },
    clearUser() {
      self.email = DEFAULT_USER.email;
      self.first_name = DEFAULT_USER.first_name;
      self.is_disabled = DEFAULT_USER.is_disabled;
      self.is_verified = DEFAULT_USER.is_verified;
      self.token = DEFAULT_USER.token;
    },
    clearLoading() {
      self.isLoading = false;
    },
    saveTokenToDevice() {
      if (!!self.token && self.token !== '') {
        storage.set(MMKV_KEYS.TOKEN, self.token);
        return true;
      }
      return false;
    },
    async loadTokenFromDevice() {
      const token = storage.getString(MMKV_KEYS.TOKEN);
      if (!!token && token !== '') {
        self.token = token;
        // TODO: Make token API check call here

        return true;
      }
      return false;
    }
  }))
  .views(self => ({
    get userToken() {
      return !!self.token && self.token !== '' ? self.token : null;
    },
    get isLoggedIn() {
      return !!self.token && self.token !== '';
    },
  }));