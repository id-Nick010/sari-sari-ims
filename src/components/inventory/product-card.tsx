import { Product } from "@/src/models/Product";
import VarColors from "@/src/theme/colors";
import VarContainers from "@/src/theme/containers";
import VarTypo from "@/src/theme/typography";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import EditModal from "../modals/edit-modal";

interface ProductCardProps {
  data: Product;
  onEditRefresh: () => void;
}

export default function ProductCard({ data, onEditRefresh }: ProductCardProps) {
  const [editModalOpen, setEditModalOpen] = useState({
    isVisible: false,
    dataId: -1,
  });
  return (
    <View style={styles.container}>
      <View style={styles.imgFrame}></View>
      <Text style={styles.prodName}>{data.name}</Text>
      <View style={{ flexDirection: "row", justifyContent: "center", gap: 5 }}>
        <Ionicons name="barcode-outline" size={20} />
        <Text style={styles.prodBarCate}>{data.barcode}</Text>
        <Ionicons name="pricetags-outline" size={16} />
        <Text style={styles.prodBarCate}>{data.category}</Text>
      </View>
      <View style={styles.statusFrame}>
        <Ionicons
          name="radio-button-on-outline"
          style={{ color: VarColors.green.c200 }}
        />
        <Text style={styles.statusText}>{data.status}</Text>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderRadius: "20%",
          marginVertical: 8,
          borderColor: VarColors.secondary.c100,
        }}
      />
      <View style={styles.numbersRow}>
        <Text style={styles.numberRowTextA}>Quantity</Text>
        <Text style={styles.numberRowTextB}>{data.quantity}</Text>
      </View>
      <View style={styles.numbersRow}>
        <Text style={styles.numberRowTextA}>Cost Price</Text>
        <Text style={styles.numberRowTextB}>{data.cost_price}</Text>
      </View>
      <View style={styles.numbersRow}>
        <Text style={styles.numberRowTextA}>Selling Price</Text>
        <Text style={styles.numberRowTextB}>{data.selling_price}</Text>
      </View>
      <View style={styles.numbersRow}>
        <Text style={styles.numberRowTextA}>Total Sales</Text>
        <Text style={styles.numberRowTextB}>P000.00</Text>
      </View>
      <Pressable
        style={styles.editBtnFrame}
        onPress={() => {
          console.log("opened modal");
          setEditModalOpen({ isVisible: true, dataId: data.id });
        }}
      >
        <Ionicons
          name="create-outline"
          size={15}
          style={{ color: VarColors.secondary.c500 }}
        />
        <Text style={styles.editBtnText}>Edit</Text>
      </Pressable>
      <EditModal
        visible={editModalOpen.isVisible}
        onClose={() => {
          setEditModalOpen({ isVisible: false, dataId: -1 });
        }}
        dataId={editModalOpen.dataId}
        onEdit={onEditRefresh}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 15,
    paddingHorizontal: 30,
    width: "100%",
    justifyContent: "space-between",
    gap: 5,
  },
  imgFrame: {
    flex: 5,
    alignSelf: "center",
    marginBottom: 5,
    width: "30%",
    aspectRatio: 1 / 1,
    backgroundColor: "tomato",
    borderRadius: VarContainers.radius.s7,
  },
  prodName: {
    flex: 5,
    ...VarTypo.body.b3_sb,
    color: VarColors.secondary.c500,
    textAlign: "center",
  },
  prodBarCate: {
    ...VarTypo.body.b4,
    textAlign: "center",
    color: VarColors.secondary.c300,
  },
  statusFrame: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    gap: 5,
    alignSelf: "center",
    backgroundColor: VarColors.green.c10,
    borderRadius: 100,
  },
  statusText: {
    color: VarColors.green.c200,
    ...VarTypo.body.b4_m,
  },
  numbersRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  numberRowTextA: {
    ...VarTypo.body.b4,
    color: VarColors.secondary.c300,
  },
  numberRowTextB: {
    ...VarTypo.body.b3,
    color: VarColors.secondary.c500,
  },
  editBtnFrame: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    gap: 4,
    marginTop: 5,
    borderWidth: 0.84,
    borderColor: VarColors.secondary.c200,
    borderRadius: VarContainers.radius.s5,
  },
  editBtnText: {
    ...VarTypo.body.b4_m,
    color: VarColors.secondary.c500,
  },
});
