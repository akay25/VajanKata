import { types, flow } from "mobx-state-tree";
import MMKV_KEYS from "~/constants/mmkv-keys";
import { DEFAULT_SETTINGS } from "~/constants/settings";
import storage from "~/utils/mmkv-storage";

export const SettingsStoreModel = types
  .model({
    weight_in_g: types.number,
    display_weight_in_kg: types.boolean,
    display_insults: types.boolean,
    dial_feedback: types.boolean,
    min_weight: types.number,
    max_weight: types.number,
  })
  .actions(self => ({
    init(newSettings: any) {
      self.weight_in_g = newSettings.weight_in_g;
      self.display_weight_in_kg = newSettings.display_weight_in_kg;
    },
    clearSettings() {
      self.weight_in_g = DEFAULT_SETTINGS.weight_in_g;
      self.display_weight_in_kg = DEFAULT_SETTINGS.display_weight_in_kg;
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
      if (self.display_weight_in_kg)
        // Return weight in kg  
        return self.weight_in_g / 1000.0;

      // Return weight in pounds
      // TODO: Save this constant somewhere
      return self.weight_in_g * 0.00220462;
    },
    get unit() {
      return self.display_weight_in_kg ? "kgs" : "lbs";
    }
  }));