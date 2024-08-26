import { StyleSheet } from "react-native";

// Local imports
import COLORS from "./colors";
import FONTS from "./fonts";

export const BUTTON = {
  BORDER_RADIUS: 8,
  HEIGHT: 45,
  FONT_SIZE: 22,
  FONT_FAMILY: FONTS.label
}

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    alignItems: "center",
    justifyContent: "center",
  },
});
