import { useInventoryController } from "@/src/controllers/InventoryController";
import VarColors from "@/src/theme/colors";
import VarContainers from "@/src/theme/containers";
import VarTypo from "@/src/theme/typography";
import { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import NumberField from "../inputFields/number-field";

interface AddModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: () => void;
}

interface CreateProductModel {
  category: string;
  name: string;
  barcode: string;
  image_url: string;
  cost_price: number;
  selling_price: number;
  quantity: number;
  low_stock_threshold: number;
}

export default function AddModal({ visible, onClose, onAdd }: AddModalProps) {
  const { createProduct } = useInventoryController();

  const [product, setProduct] = useState({
    category: "_",
    name: "_",
    barcode: "_",
    image_url: "_",
    cost_price: 0,
    selling_price: 0,
    quantity: 0,
    low_stock_threshold: 0,
  });

  const resetAddData = () =>
    setProduct({
      category: "_",
      name: "_",
      barcode: "_",
      image_url: "_",
      cost_price: 0,
      selling_price: 0,
      quantity: 0,
      low_stock_threshold: 0,
    });

  //used generic for easy editing for each data in product
  const updateProductField = <K extends keyof CreateProductModel>(
    key: K,
    value: CreateProductModel[K],
  ) => {
    setProduct((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const sendNewDataToDB = async () => {
    await createProduct(
      product.category,
      product.name,
      product.barcode,
      product.image_url,
      product.cost_price,
      product.selling_price,
      product.quantity,
      product.low_stock_threshold,
    );
    onAdd();
    resetAddData();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={styles.modalBox}>
          <Text style={styles.headerText}>Add New Item</Text>
          <View style={styles.dividerSpace} />
          <Text style={styles.fieldNameText}>Item Name</Text>
          <View style={styles.textFieldFrame}>
            <TextInput
              style={styles.textField}
              placeholder={"Enter item name"}
              onChangeText={(val) => updateProductField("name", val)}
            />
          </View>

          <Text style={styles.fieldNameText}>Barcode</Text>
          <View style={styles.textFieldFrame}>
            <TextInput
              style={styles.textField}
              placeholder={"Enter or Scan Barcode"}
              onChangeText={(val) => updateProductField("barcode", val)}
            />
          </View>
          <Text style={styles.fieldNameText}>Category</Text>
          <View style={styles.textFieldFrame}>
            <TextInput
              style={styles.textField}
              placeholder={"Select Category"}
              onChangeText={(val) => updateProductField("category", val)}
            />
          </View>
          <View
            style={{
              flexDirection: "column",
              gap: "3%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                gap: "3%",
              }}
            >
              <View style={styles.numberField}>
                <Text style={styles.fieldNameText}>Quantity</Text>
                <NumberField
                  value={product.quantity}
                  setValue={(val) => updateProductField("quantity", val)}
                />
              </View>
              <View style={styles.numberField}>
                <Text style={styles.fieldNameText}>Low Stock Threshold</Text>
                <NumberField
                  value={product.low_stock_threshold}
                  setValue={(val) =>
                    updateProductField("low_stock_threshold", val)
                  }
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                gap: "3%",
              }}
            >
              <View style={styles.numberField}>
                <Text style={styles.fieldNameText}>Cost Price</Text>
                <NumberField
                  value={product.cost_price}
                  setValue={(val) => updateProductField("cost_price", val)}
                />
              </View>
              <View style={styles.numberField}>
                <Text style={styles.fieldNameText}>Selling Price</Text>

                <NumberField
                  value={product.selling_price}
                  setValue={(val) => updateProductField("selling_price", val)}
                />
              </View>
            </View>
          </View>
          <Text style={styles.fieldNameText}>Product Image</Text>
          <View style={styles.textFieldFrame}>
            <TextInput
              style={styles.textField}
              placeholder={"No image Chosen"}
              onChangeText={(val) => updateProductField("image_url", val)}
            />
          </View>
          <Text style={styles.subText}>
            Upload an image from your device (JPG, PNG, etc.)
          </Text>
          <View style={{ flexDirection: "row", marginTop: "3%", gap: "2%" }}>
            <Pressable
              style={[
                styles.modalBtn,
                {
                  borderWidth: VarContainers.stroke.s0,
                  borderColor: VarColors.neutral.c200,
                },
              ]}
              onPress={onClose}
            >
              <Text
                style={[
                  styles.modalBtnText,
                  { color: VarColors.secondary.c500 },
                ]}
              >
                Cancel
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.modalBtn,
                { backgroundColor: VarColors.primary.c300 },
              ]}
              onPress={sendNewDataToDB}
            >
              <Text
                style={[styles.modalBtnText, { color: VarColors.neutral.c100 }]}
              >
                Add Item
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  //modal styles
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1d1e227e",
  },
  dividerSpace: {
    height: "4%",
  },
  modalBox: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 20,
    width: "35%",
    borderRadius: 15,
    backgroundColor: "white",
  },
  modalBtn: {
    flex: 2,
    alignItems: "center",
    padding: 8,
    borderRadius: VarContainers.radius.s4,
  },
  modalBtnText: {
    ...VarTypo.body.b4_sb,
  },
  modalText: {
    color: VarColors.secondary.c500,
  },
  headerText: {
    ...VarTypo.head.h7,
    color: VarColors.secondary.c500,
  },
  fieldNameText: {
    ...VarTypo.body.b4_sb,
    color: VarColors.secondary.c500,
  },
  subText: {
    ...VarTypo.body.b4,
    color: VarColors.neutral.c600,
  },
  textFieldFrame: {
    width: "100%",
    marginBottom: "2%",
    borderWidth: VarContainers.stroke.s0,
    borderColor: VarColors.neutral.c300,
    borderRadius: VarContainers.radius.s4,
  },
  textField: {
    paddingHorizontal: 10,
    color: VarColors.neutral.c600,
  },
  numberField: {
    flex: 1,
    flexDirection: "column",
  },
});
