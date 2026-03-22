import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function GreetingBar() {
  return (
    <>
      <View style={styles.container}>
        <View style={{ flex: 2 }}>
          <Text style={styles.h1}>AGAO Sari-Sari Store Inventory</Text>
          <Text style={styles.p}>Wednesday, March 4, 2026</Text>
        </View>
        <TouchableOpacity style={styles.notifBtn}>
          <Ionicons name="notifications-outline" size={25} />
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
  },
  h1: {
    fontSize: 22,
    fontWeight: "bold",
  },
  p: {
    fontSize: 14,
  },
  notifBtn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    padding: 4,
    aspectRatio: 1,
  },
});
