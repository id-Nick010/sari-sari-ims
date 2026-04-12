import { useInventoryController } from "@/src/controllers/InventoryController";
import { Product } from "@/src/models/Product";
import VarColors from "@/src/theme/colors";
import VarContainers from "@/src/theme/containers";
import { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

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

  const [product, setProduct] = useState<Product | null>();

  useEffect(() => {
    (async () => {
      const newProd = await getProductById(dataId);
      setProduct(newProd);
    })();
  }, [dataId, getProductById]);

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
          <Text style={styles.modalText}>This is your Id now: {dataId}</Text>
          <Text>
            Product: {product?.name}, {"\n"}Stock: {product?.status}
          </Text>
          <Pressable style={styles.modalButton} onPress={onClose}>
            <Text style={styles.modalText}>Close</Text>
          </Pressable>
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
    width: 250,
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
});
