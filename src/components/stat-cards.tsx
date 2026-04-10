import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import VarColors from "../theme/colors";
import VarContainers from "../theme/containers";
import VarTypo from "../theme/typography";

const contStyle = VarContainers;
const typeStyle = VarTypo;
const colorStyle = VarColors;

export default function StatCards() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.topText}>Total Items</Text>
        <Text style={styles.mainText}>142</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.subText}>vs last month </Text>
          <View>
            <Text style={styles.subTextState_up}>+12.5%</Text>
          </View>
          <Ionicons
            name="trending-up-outline"
            size={15}
            style={styles.subTextState_up}
          />
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.topText}>Total Inventory Value</Text>
        <Text style={styles.mainText}>₱2,847.50</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.subText}>vs last month </Text>
          <View>
            <Text style={styles.subTextState_down}>-3%</Text>
          </View>
          <Ionicons
            name="trending-down-outline"
            size={15}
            style={styles.subTextState_down}
          />
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.topText}>Low Stock Items</Text>
        <Text style={styles.mainText}>500</Text>
        <View style={{ flexDirection: "row" }}>
          <Ionicons
            name="alert-circle-outline"
            size={15}
            style={styles.subTextState_down}
          />
          <View>
            <Text style={styles.subTextState_down}> Critical Level</Text>
          </View>
          <Ionicons
            name="trending-down-outline"
            size={15}
            style={styles.subTextState_down}
          />
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.topText}>Out of Stock</Text>
        <Text style={styles.mainText}>500</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.subText}>vs last month </Text>
          <View>
            <Text style={styles.subTextState_down}>-3%</Text>
          </View>
          <Ionicons
            name="trending-down-outline"
            size={15}
            style={styles.subTextState_down}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginBottom: contStyle.spacing.s5,
  },
  card: {
    width: "24%",
    paddingVertical: contStyle.spacing.s4,
    paddingHorizontal: contStyle.spacing.s6,
    borderRadius: contStyle.radius.s7,
    backgroundColor: colorStyle.neutral.c100,
  },
  topText: {
    ...typeStyle.body.b3,
    color: colorStyle.secondary.c500,
  },
  mainText: {
    ...typeStyle.head.h7,
    color: colorStyle.secondary.c500,
  },
  subText: {
    ...typeStyle.body.b4,
    color: colorStyle.secondary.c500,
  },
  subTextState_up: {
    ...typeStyle.body.b4,
    color: colorStyle.green.c200,
  },
  subTextState_down: {
    ...typeStyle.body.b4,
    color: colorStyle.red.c200,
  },
});
