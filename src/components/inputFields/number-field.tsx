import VarColors from "@/src/theme/colors";
import VarContainers from "@/src/theme/containers";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

interface Props {
  value: number;
  setValue: (val: number) => void;
}

export default function NumberField({ value, setValue }: Props) {
  const increase = () => setValue(value + 1);
  const decrease = () => setValue(value - 1);

  return (
    <View style={styles.container}>
      <Pressable onPress={decrease} style={styles.setterBtn}>
        <Ionicons
          name="chevron-back-outline"
          size={18}
          style={styles.setterIcon}
        />
      </Pressable>
      <TextInput
        value={String(value)}
        style={styles.numField}
        onChangeText={(text) => {
          const num = Number(text);
          if (!isNaN(num)) setValue(num);
        }}
        keyboardType="numeric"
      />
      <Pressable onPress={increase} style={styles.setterBtn}>
        <Ionicons
          name="chevron-forward-outline"
          size={18}
          style={styles.setterIcon}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 2,
    borderWidth: VarContainers.stroke.s0,
    borderRadius: VarContainers.radius.s4,
    borderColor: VarColors.neutral.c300,
  },
  numField: {
    flex: 8,
    textAlign: "center",
    color: VarColors.neutral.c600,
    paddingHorizontal: 10,
  },
  setterBtn: {
    padding: "5%",
  },
  setterIcon: {
    color: VarColors.neutral.c700,
  },
});
