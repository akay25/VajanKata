import { types, flow } from "mobx-state-tree";
import { G } from "react-native-svg";
import MMKV_KEYS from "~/constants/mmkv-keys";
import { DEFAULT_SETTINGS } from "~/constants/settings";
import storage from "~/utils/mmkv-storage";

const getWeightInKgs = (weight_in_g: number) => {
  return weight_in_g / 1000.0;
}

const getWeightInPounds = (weight_in_g: number) => {
  return weight_in_g * 0.00220462;
}

const getRoundUpValue = (weight: number) => {
  return parseFloat(weight + '').toFixed(1);
}

export const SettingsStoreModel = types
  .model({
    weight_in_g: types.number,
    display_weight_in_kg: types.boolean,
    display_insults: types.boolean,
    dial_feedback: types.boolean,
    min_weight_in_g: types.number,
    max_weight_in_g: types.number,
  })
  .actions(self => ({
    init(newSettings: any) {
      self.weight_in_g = newSettings.weight_in_g;
      self.display_weight_in_kg = newSettings.display_weight_in_kg;
    },
    clearSettings() {
      self.weight_in_g = DEFAULT_SETTINGS.weight_in_g;
      self.display_weight_in_kg = DEFAULT_SETTINGS.display_weight_in_kg;
      self.min_weight_in_g = DEFAULT_SETTINGS.min_weight_in_g;
      self.max_weight_in_g = DEFAULT_SETTINGS.max_weight_in_g;
      self.display_insults = DEFAULT_SETTINGS.display_insults;
      self.dial_feedback = DEFAULT_SETTINGS.dial_feedback;
    },
    toggleUnit(value: boolean) {
      self.display_weight_in_kg = value;
    },
    setWeightInG(value: number) {
      self.weight_in_g = value;

      // TODO: Check of min and max weight before moving forward
    },
  }))
  .views(self => ({
    get weight() {
      const converted_weight = self.display_weight_in_kg ? getWeightInKgs(self.weight_in_g) : getWeightInPounds(self.weight_in_g);
      return getRoundUpValue(converted_weight);
    },
    get unit() {
      return self.display_weight_in_kg ? "kgs" : "lbs";
    },
    get min_weight() {
      const converted_weight = self.display_weight_in_kg ? getWeightInKgs(self.min_weight_in_g) : getWeightInPounds(self.min_weight_in_g);
      return getRoundUpValue(converted_weight);
    },
    get max_weight() {
      const converted_weight = self.display_weight_in_kg ? getWeightInKgs(self.max_weight_in_g) : getWeightInPounds(self.max_weight_in_g);
      return getRoundUpValue(converted_weight);
    },
  }));