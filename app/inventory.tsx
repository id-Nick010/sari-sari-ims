import GreetingBar from "@/src/components/greeting-bar";
import StatCards from "@/src/components/stat-cards";
import InvTable from "@/src/components/table/inv-table";
import SearchBar from "@/src/components/table/search-bar";
import ViewToggle from "@/src/components/table/view-toggle";
import { InventoryController } from "@/src/controllers/InventoryController";
import { Product } from "@/src/models/Product";
import VarColors from "@/src/theme/colors";
import VarContainers from "@/src/theme/containers";
import VarTypo from "@/src/theme/typography";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const colorStyle = VarColors;
const contStyle = VarContainers;
const typoStyle = VarTypo;

async function addTempoInvDate() {
  await InventoryController.createItem(
    "Electronics",
    "Wireless Bluetooth Headphones",
    "8934720193845",
    "https://example.com/images/headphones.png",
    1199.5,
    1898.99,
    44,
    9,
  );
}

export default function InventoryScreen() {
  // add tempo product data

  // load products for the inventory table
  const [products, setProducts] = useState<Product[]>([]);

  const loadProductData = async () => {
    const data = await InventoryController.loadProducts();
    setProducts(data);
  };

  useEffect(() => {
    loadProductData();
  }, []);

  // console.log(
  //   "Product data in Inventory: \n" + JSON.stringify(products, null, 2),
  // );

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <View style={{ flex: 1, marginInline: contStyle.spacing.s7 }}>
          <GreetingBar />
        </View>
        <View style={{ flex: 2, marginInline: contStyle.spacing.s7 }}>
          <StatCards />
        </View>
        <View style={styles.tableSection}>
          {/* inventorytable  */}
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              margin: contStyle.spacing.s4,
              gap: 10,
            }}
          >
            {/* Search & View Toggle */}
            <View
              style={{
                flex: 6,
                flexDirection: "row",
                gap: 10,
              }}
            >
              <View style={{ flex: 7, justifyContent: "center" }}>
                <SearchBar />
              </View>
              <View style={{ flex: 3, justifyContent: "center" }}>
                <ViewToggle labelA="Table" labelB="Cards" />
              </View>
            </View>
            {/* Table Action Buttons */}
            <View
              style={{
                flex: 4,
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Pressable
                onPress={async () => {
                  await addTempoInvDate();
                  await loadProductData();
                }}
                style={({ pressed }) => [
                  styles.addItemBtn,
                  {
                    backgroundColor: pressed
                      ? "lightgrey"
                      : colorStyle.primary.c300,
                  },
                ]}
              >
                <Ionicons
                  style={styles.addItemBtnIcon}
                  name="add-outline"
                  size={20}
                />
                <Text style={styles.addItemBtnText}>Add Item</Text>
              </Pressable>
              <Pressable
                onPress={async () => {
                  await InventoryController.resetData();
                  loadProductData();
                }}
                style={({ pressed }) => [
                  styles.delItemBtn,
                  {
                    backgroundColor: pressed
                      ? "lightgrey"
                      : colorStyle.neutral.c100,
                  },
                ]}
              >
                <Ionicons
                  style={styles.delItemBtnIcon}
                  name="trash-outline"
                  size={20}
                />
                <Text style={styles.delItemBtnText}>Delete</Text>
              </Pressable>
            </View>
          </View>
          {/* <View style={{ flex: 1 }}></View> */}
          {/* main inventory tbl */}
          <View style={styles.mainTable}>
            <InvTable data={products} />
          </View>
          {/* tbl item cnt */}
          <View style={{}}>{/* table item tab view btn */}</View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colorStyle.yellow.c10,
  },
  tableSection: {
    flex: 7,
    width: "95%",
    marginInline: contStyle.spacing.s7,
    backgroundColor: colorStyle.neutral.c100,
    borderWidth: contStyle.stroke.s0,
    borderColor: colorStyle.neutral.c200,
    borderRadius: contStyle.radius.s6,
  },
  // action buttons
  addItemBtn: {
    height: "100%",
    flexDirection: "row",
    gap: 10,
    paddingInline: contStyle.spacing.s4,
    justifyContent: "center",
    alignItems: "center",

    borderRadius: contStyle.radius.s5,
  },
  addItemBtnText: {
    color: colorStyle.neutral.c100,
    ...typoStyle.body.b3_sb,
  },
  addItemBtnIcon: {
    color: colorStyle.neutral.c100,
  },
  delItemBtn: {
    height: "100%",
    flexDirection: "row",
    gap: 10,
    paddingInline: contStyle.spacing.s4,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.84,
    borderRadius: contStyle.radius.s5,

    borderColor: colorStyle.red.c200,
  },
  delItemBtnText: {
    color: colorStyle.red.c200,
    ...typoStyle.body.b3_m,
  },
  delItemBtnIcon: {
    color: colorStyle.red.c200,
  },
  mainTable: {
    flex: 7,
    paddingInline: contStyle.spacing.s4,
  },
});
