import GreetingBar from "@/src/components/greeting-bar";
import VarColors from "@/src/theme/colors";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const colorStyle = VarColors;

export default function InventoryScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <GreetingBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colorStyle.yellow.c10,
  },
});
