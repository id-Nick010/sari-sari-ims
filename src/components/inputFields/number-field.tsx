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
      <TextInput
        value={String(value)}
        style={styles.numField}
        onChangeText={(text) => {
          const num = Number(text);
          if (!isNaN(num)) setValue(num);
        }}
        keyboardType="numeric"
      />

      <View>
        <Pressable onPress={increase} style={styles.setterBtn}>
          <Ionicons
            name="caret-up-outline"
            size={5}
            style={styles.setterIcon}
          />
        </Pressable>
        <Pressable onPress={decrease} style={styles.setterBtn}>
          <Ionicons
            name="caret-down-outline"
            size={5}
            style={styles.setterIcon}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  numField: {},
  setterBtn: {},
  setterIcon: {},
});
