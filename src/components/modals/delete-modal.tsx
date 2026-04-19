import { useInventoryController } from "@/src/controllers/InventoryController";
import { Product } from "@/src/models/Product";
import VarColors from "@/src/theme/colors";
import VarContainers from "@/src/theme/containers";
import VarTypo from "@/src/theme/typography";
import { Ionicons } from "@expo/vector-icons";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

interface DeleteModalProps {
  visible: boolean;
  data: Product[];
  productIds: number[];
  onClose: () => void;
  onDelete: () => void;
}

export default function DeleteModal({
  visible,
  data,
  productIds,
  onDelete,
  onClose,
}: DeleteModalProps) {
  const { deleteProductBulk } = useInventoryController();
  const deleteToDB = async () => {
    await deleteProductBulk(productIds);
    onDelete();
    onClose();
  };

  const headerItems = data
    .filter((p) => productIds.includes(p.id))
    .map((p) => p.name);

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
          <Ionicons style={styles.deleteIcon} name="trash-outline" size={30} />
          <Text style={styles.headerText}>
            Delete {headerItems.join(", ")}?
          </Text>
          <Text style={styles.subText}>
            Are you sure you want to delete{" "}
            <Text style={styles.subTextHigh}>
              {productIds.length} selected item
              {productIds.length > 1 ? "s" : ""}?
            </Text>{" "}
            This action cannot be undone.
          </Text>
          <View style={styles.actionBtnFrame}>
            <Pressable
              onPress={onClose}
              style={[styles.cancelBtn, styles.actionBtn]}
            >
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </Pressable>
            <Pressable
              onPress={deleteToDB}
              style={[styles.deleteBtn, styles.actionBtn]}
            >
              <Text style={styles.deleteBtnText}>Delete</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1d1e227e",
  },
  modalBox: {
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20,
    width: "30%",
    height: "35%",
    borderRadius: 20,
    backgroundColor: "white",
  },
  deleteIcon: {
    padding: 10,
    borderRadius: 100,
    backgroundColor: VarColors.red.c10,
    color: VarColors.red.c200,
  },
  headerText: {
    ...VarTypo.body.b2_b,
    textAlign: "center",
    color: VarColors.secondary.c500,
  },
  subText: {
    ...VarTypo.body.b3,
    textAlign: "center",
    color: VarColors.secondary.c500,
  },
  subTextHigh: {
    ...VarTypo.body.b3_sb,
  },
  actionBtnFrame: {
    marginTop: "2%",
    flexDirection: "row",
    gap: "2%",
  },
  actionBtn: {
    flex: 2,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: VarContainers.radius.s4,
  },
  cancelBtn: {
    borderWidth: VarContainers.stroke.s0,
    borderColor: VarColors.neutral.c200,
  },
  deleteBtn: {
    backgroundColor: VarColors.red.c200,
  },
  cancelBtnText: {
    ...VarTypo.body.b4,
    color: VarColors.secondary.c500,
  },
  deleteBtnText: {
    color: VarColors.neutral.c100,
    ...VarTypo.body.b4_sb,
  },
});
