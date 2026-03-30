// CSS Style Variables
// for texts

import { TextStyle } from "react-native";

type Typography = {
  head: Record<string, TextStyle>;
  body: Record<string, TextStyle>;
};

const VarTypo: Typography = {
  head: {
    h1: {
      fontFamily: "Inter_700Bold",
      fontSize: 68,
      lineHeight: 102,
      letterSpacing: 0,
      textDecorationLine: "none",
    },
    h2: {
      fontFamily: "Inter_700Bold",
      fontSize: 56,
      lineHeight: 84,
      letterSpacing: 0,
      textDecorationLine: "none",
    },
    h3: {
      fontFamily: "Inter_700Bold",
      fontSize: 46,
      lineHeight: 69,
      letterSpacing: 0,
      textDecorationLine: "none",
    },
    h4: {
      fontFamily: "Inter_700Bold",
      fontSize: 38,
      lineHeight: 57,
      letterSpacing: 0,
      textDecorationLine: "none",
    },
    h5: {
      fontFamily: "Inter_700Bold",
      fontSize: 32,
      lineHeight: 48,
      letterSpacing: 0,
      textDecorationLine: "none",
    },
    h6: {
      fontFamily: "Inter_700Bold",
      fontSize: 26,
      lineHeight: 39,
      letterSpacing: 0,
      textDecorationLine: "none",
    },
    h7: {
      fontFamily: "Inter_700Bold",
      fontSize: 22,
      lineHeight: 33,
      letterSpacing: 0,
      textDecorationLine: "none",
    },
  },
  body: {
    b1: {
      fontFamily: "Inter_500Medium",
      fontSize: 18,
      lineHeight: 27,
    },
    b2: {
      fontFamily: "Inter_400Regular",
      fontSize: 16,
      lineHeight: 24,
    },
    b2_b: {
      fontFamily: "Inter_700Bold",
      fontSize: 16,
      lineHeight: 27,
    },
    b3: {
      fontFamily: "Inter_400Regular",
      fontSize: 14,
      lineHeight: 21,
    },
    b3_sb: {
      fontFamily: "Inter_600SemiBold",
      fontSize: 14,
      lineHeight: 19.5,
    },
    b3_m: {
      fontFamily: "Inter_500Medium",
      fontSize: 14,
      lineHeight: 19.5,
    },
    b4: {
      fontFamily: "Inter_400Regular",
      fontSize: 12,
      lineHeight: 18,
    },
    b4_m: {
      fontFamily: "Inter_500Medium",
      fontSize: 12,
      lineHeight: 19.5,
    },
    b4_sb: {
      fontFamily: "Inter_600SemiBold",
      fontSize: 12,
      lineHeight: 19.5,
    },
  },
};

export default VarTypo;
