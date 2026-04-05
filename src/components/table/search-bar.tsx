import VarColors from "@/src/theme/colors";
import VarContainers from "@/src/theme/containers";
import VarTypo from "@/src/theme/typography";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const colorStyle = VarColors;
const typoStyle = VarTypo;
const contStyle = VarContainers;

export default function SearchBar() {
  return (
    <View style={styles.container}>
      <Ionicons style={styles.searchIcon} name="search-outline" size={25} />
      <TextInput style={styles.searchBar} placeholder="Search Items..." />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingInline: contStyle.spacing.s2,
    borderWidth: contStyle.stroke.s0,
    borderRadius: contStyle.radius.s7,
    borderColor: colorStyle.neutral.c300,
  },
  searchIcon: {
    color: colorStyle.neutral.c600,
  },
  searchBar: {
    ...typoStyle.body.b3,
    color: colorStyle.neutral.c600,
    height: "100%",
  },
});
