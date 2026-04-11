import { Pressable, StyleSheet, Text } from "react-native";
import VarColors from "../theme/colors";
import VarContainers from "../theme/containers";

interface Props {
  checked: boolean;
  onChange: (newValue: boolean) => void;
}

export default function CheckBox({ checked, onChange }: Props) {
  return (
    <Pressable
      style={[styles.box, checked && styles.boxChecked]}
      onPress={() => onChange(!checked)}
    >
      {checked && <Text style={styles.checkMark}>✓</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: VarContainers.radius.s3,
    borderColor: VarColors.neutral.c200,
    justifyContent: "center",
    alignItems: "center",
  },
  boxChecked: {
    backgroundColor: VarColors.secondary.c300,
    borderColor: VarColors.secondary.c300,
  },
  checkMark: {
    color: "white",
    fontWeight: 900,
  },
});
