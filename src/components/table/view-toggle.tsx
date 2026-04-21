import VarColors from "@/src/theme/colors";
import VarContainers from "@/src/theme/containers";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type ViewToggleProps = {
  labelA: string;
  labelB: string;
  currValue: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
};

export default function ViewToggle({
  labelA,
  labelB,
  currValue,
  setValue,
}: ViewToggleProps) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          setValue(1);
        }}
        style={[
          styles.toggleBtn,
          currValue === 1 ? styles.btnEnabled : styles.btnDisabled,
        ]}
      >
        <Ionicons
          name="list-outline"
          size={22}
          style={[currValue === 1 ? styles.textEnabled : styles.textDisabled]}
        />
        <Text
          style={[currValue === 1 ? styles.textEnabled : styles.textDisabled]}
        >
          {labelA}
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          setValue(2);
        }}
        style={[
          styles.toggleBtn,
          currValue === 2 ? styles.btnEnabled : styles.btnDisabled,
        ]}
      >
        <Ionicons
          name="grid-outline"
          size={22}
          style={[currValue === 2 ? styles.textEnabled : styles.textDisabled]}
        />
        <Text
          style={[currValue === 2 ? styles.textEnabled : styles.textDisabled]}
        >
          {labelB}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: VarColors.secondary.c100,
    width: "100%",
    borderColor: VarColors.secondary.c500,
    borderRadius: VarContainers.radius.s5,
    padding: VarContainers.spacing.s2,
    gap: 5,
  },
  toggleBtn: {
    flex: 1,
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    borderRadius: VarContainers.radius.s5,
  },
  btnEnabled: {
    backgroundColor: VarColors.neutral.c100,
  },
  textEnabled: {
    color: VarColors.secondary.c500,
  },
  btnDisabled: {
    backgroundColor: "transparent",
  },
  textDisabled: {
    color: VarColors.neutral.c600,
  },
});
