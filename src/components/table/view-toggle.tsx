import VarColors from "@/src/theme/colors";
import VarContainers from "@/src/theme/containers";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type ViewToggleProps = {
  labelA: string;
  labelB: string;
};

export default function ViewToggle({ labelA, labelB }: ViewToggleProps) {
  const [activeBtn, setActiveBtn] = useState(1);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => setActiveBtn(1)}
        style={[
          styles.toggleBtn,
          activeBtn === 1 ? styles.btnEnabled : styles.btnDisabled,
        ]}
      >
        <Ionicons
          name="list-outline"
          size={22}
          style={[activeBtn === 1 ? styles.textEnabled : styles.textDisabled]}
        />
        <Text
          style={[activeBtn === 1 ? styles.textEnabled : styles.textDisabled]}
        >
          {labelA}
        </Text>
      </Pressable>
      <Pressable
        onPress={() => setActiveBtn(2)}
        style={[
          styles.toggleBtn,
          activeBtn === 2 ? styles.btnEnabled : styles.btnDisabled,
        ]}
      >
        <Ionicons
          name="grid-outline"
          size={22}
          style={[activeBtn === 2 ? styles.textEnabled : styles.textDisabled]}
        />
        <Text
          style={[activeBtn === 2 ? styles.textEnabled : styles.textDisabled]}
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
