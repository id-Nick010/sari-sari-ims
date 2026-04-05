import GreetingBar from "@/src/components/greeting-bar";
import StatCards from "@/src/components/stat-cards";
import SearchBar from "@/src/components/table/search-bar";
import VarColors from "@/src/theme/colors";
import VarContainers from "@/src/theme/containers";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const colorStyle = VarColors;
const contStyle = VarContainers;

export default function InventoryScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={{ flex: 1, marginInline: contStyle.spacing.s7 }}>
        <GreetingBar />
      </View>
      <View style={{ flex: 2, marginInline: contStyle.spacing.s7 }}>
        <StatCards />
      </View>
      <View style={styles.tableSection}>
        {/* inventorytable  */}
        <View style={{ flex: 1 }}>
          {/* search table */}
          <SearchBar />
          {/* tbl view */}
          {/* tbl action btns */}
        </View>
        <View>{/* tbl category filter btns */}</View>
        {/* tbl item cnt */}
        <View>{/* table item tab view btn */}</View>
      </View>
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
  tableSection: {
    flex: 7,
    width: "95%",
    marginInline: contStyle.spacing.s7,
    backgroundColor: colorStyle.neutral.c100,
    borderWidth: contStyle.stroke.s0,
    borderColor: colorStyle.neutral.c200,
    borderRadius: contStyle.radius.s6,
  },
});
