import { types, } from "mobx-state-tree";

// Local values
import storage from "~/utils/mmkv-storage";
import MMKV_KEYS from "~/constants/mmkv-keys";
import { DEFAULT_SETTINGS } from "~/constants/settings";
import { getWeightInKgs, getWeightInPounds, getRoundUpValue } from "~/utils/helper";



export const SettingsStoreModel = types
  .model({
    // height_in_cms: types.number,
    weight_in_g: types.number,
    display_weight_in_kg: types.boolean,
    display_insults: types.boolean,
    dial_feedback: types.boolean,
    min_weight_in_g: types.number,
    max_weight_in_g: types.number,
  })
  .actions(self => ({
    init(newSettings: any) {
      // self.height_in_cms = 172.00; // TODO: Change it later when adding new settings 
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

      // Check of min and max weight before moving forward
      if (value > self.max_weight_in_g) {
        self.max_weight_in_g = value;
      } else if (value < self.min_weight_in_g) {
        self.min_weight_in_g = value;
      }
    },
    calculateBMI() {
      const heightInCMS = 1.72;
      const bmiValue = (self.weight_in_g / 1000) / (heightInCMS * heightInCMS);

      return parseFloat(bmiValue.toFixed(2));
    }
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