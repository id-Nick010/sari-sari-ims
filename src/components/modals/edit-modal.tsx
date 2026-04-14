import { useInventoryController } from "@/src/controllers/InventoryController";
import { Product } from "@/src/models/Product";
import VarColors from "@/src/theme/colors";
import VarContainers from "@/src/theme/containers";
import { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import NumberField from "../inputFields/number-field";

interface EditModalProps {
  visible: boolean;
  onClose: () => void;
  dataId: number;
}

export default function EditModal({
  visible,
  onClose,
  dataId,
}: EditModalProps) {
  const { getProductById } = useInventoryController();

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    (async () => {
      const newProd = await getProductById(dataId);
      setProduct(newProd);
    })();
  }, [dataId, getProductById]);

  //used generic for easy editing for each data in product
  const updateProductField = <K extends keyof Product>(
    key: K,
    value: Product[K],
  ) => {
    setProduct((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  if (!product) return null;

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
          <Text style={styles.fieldNameText}>Item Name</Text>
          <TextInput style={styles.textField} value={product.name} />
          <Text style={styles.fieldNameText}>Barcode</Text>
          <TextInput style={styles.textField} value={product.barcode} />
          <Text style={styles.fieldNameText}>Category</Text>
          <TextInput style={styles.textField} value={product.category} />

          <View style={{ flexDirection: "row" }}>
            <Text style={styles.fieldNameText}>Quantity</Text>
            <NumberField
              value={product.quantity}
              setValue={(val) => updateProductField("quantity", val)}
            />
            <Text style={styles.fieldNameText}>Cost Price</Text>
            <NumberField
              value={product.cost_price}
              setValue={(val) => updateProductField("cost_price", val)}
            />
            <Text style={styles.fieldNameText}>Selling Price</Text>
            <NumberField
              value={product.selling_price}
              setValue={(val) => updateProductField("selling_price", val)}
            />
          </View>
          <Text style={styles.fieldNameText}>Product Image</Text>
          <TextInput style={styles.textField} value={product.image_url} />
          <View style={{ flexDirection: "row" }}>
            <Pressable style={styles.modalButton} onPress={onClose}>
              <Text style={styles.modalText}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.modalButton} onPress={onClose}>
              <Text style={styles.modalText}>Add Item</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  //modal styles
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  overlay: {
    flex: 1,
    backgroundColor: "#1d1e227e",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
  },
  modalButton: {
    padding: 8,
    borderRadius: 5,
    borderWidth: VarContainers.stroke.s1,
    marginTop: 10,
    borderColor: VarColors.neutral.c200,
  },
  modalText: { color: VarColors.secondary.c500 },
  headerText: {},
  fieldNameText: {},
  textField: {},
});
