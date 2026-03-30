import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import VarColors from "../theme/colors";
import VarContainers from "../theme/containers";
import VarTypo from "../theme/typography";

const contStyle = VarContainers;
const typeStyle = VarTypo;
const colorStyle = VarColors;

export default function GreetingBar() {
  return (
    <>
      <View style={styles.container}>
        <View style={{ flex: 2 }}>
          <Text style={styles.h1}>
            AGAO Sari-Sari Store{" "}
            <Text style={{ color: colorStyle.secondary.c500 }}>Inventory</Text>
          </Text>
          <Text style={styles.p}>Wednesday, March 4, 2026</Text>
        </View>
        <TouchableOpacity style={styles.langBtn}>
          <Ionicons
            name="language-outline"
            size={25}
            style={{ color: colorStyle.neutral.c700 }}
          />
          <Text
            style={{ ...typeStyle.body.b3, color: colorStyle.neutral.c700 }}
          >
            Eng
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notifBtn}>
          <Ionicons
            name="notifications-outline"
            size={25}
            style={{ color: colorStyle.neutral.c700 }}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    maxHeight: 100,
    paddingInline: 20,
    paddingBlock: 10,
    gap: contStyle.spacing.s4,
    backgroundColor: colorStyle.yellow.c10,
  },
  h1: { ...typeStyle.head.h7, color: colorStyle.primary.c300 },
  p: { ...typeStyle.body.b3, color: colorStyle.secondary.c300 },
  notifBtn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: "4%",
    borderRadius: 5,
    padding: 4,
    marginBlock: 5,
  },
  langBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: "6%",
    borderRadius: 5,
    padding: 4,
    marginBlock: 5,
    gap: 5,
  },
});
