import { DEFAULT_SETTINGS } from "./settings";


const PARTS_IN_BETWEEN = 10;
export const MAX_WEIGHT = DEFAULT_SETTINGS.max_weight_in_g / 1000;

export let WEIGHT_DATA = [];
for (let i = 0; i <= MAX_WEIGHT; i += 10) {
  if (i == MAX_WEIGHT) {
    WEIGHT_DATA.push({
      key: `${i}.0`,
      int: i,
      dec: 0,
    });
  } else {
    for (let j = 0; j < PARTS_IN_BETWEEN; j++) {
      WEIGHT_DATA.push({
        key: `${i}.${j}`,
        int: i,
        dec: j,
      });
    }
  }
}
