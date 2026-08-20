import VarColors from "@/src/theme/colors";
import VarContainers from "@/src/theme/containers";
import VarTypo from "@/src/theme/typography";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const colorStyle = VarColors;
const typoStyle = VarTypo;
const contStyle = VarContainers;

type SearchBarProps = {
  onSearch: (text: string) => void;
};

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [text, setText] = useState("");

  const handleSearch = (value: string) => {
    onSearch(value);
    setText(value);
    console.log("text: " + text + ", value: " + value);
  };

  return (
    <View style={styles.container}>
      <Ionicons style={styles.searchIcon} name="search-outline" size={25} />
      <TextInput
        style={styles.searchBar}
        value={text}
        onChangeText={handleSearch}
        placeholder="Search Items..."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingInline: contStyle.spacing.s2,
    borderWidth: contStyle.stroke.s0,
    borderRadius: contStyle.radius.s7,
    borderColor: colorStyle.neutral.c300,
  },
  searchIcon: {
    color: colorStyle.neutral.c600,
    width: "6%",
  },
  searchBar: {
    ...typoStyle.body.b3,
    color: colorStyle.neutral.c600,
    height: "100%",
    width: "94%",
  },
});
