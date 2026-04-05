import GreetingBar from "@/src/components/greeting-bar";
import StatCards from "@/src/components/stat-cards";
import SearchBar from "@/src/components/table/search-bar";
import ViewToggle from "@/src/components/table/view-toggle";
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
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 10,
            gap: 10,
          }}
        >
          <View style={{ flex: 8, justifyContent: "center" }}>
            <SearchBar />
          </View>
          <View style={{ flex: 2, justifyContent: "center" }}>
            <ViewToggle labelA="Table" labelB="Cards" />
          </View>
          {/* tbl action btns */}
        </View>
        <View style={{ flex: 1 }}>{/* tbl category filter btns */}</View>
        {/* tbl item cnt */}
        <View style={{ flex: 8 }}>{/* table item tab view btn */}</View>
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
