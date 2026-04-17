import { useInventoryController } from "@/src/controllers/InventoryController";
import VarColors from "@/src/theme/colors";
import VarContainers from "@/src/theme/containers";
import VarTypo from "@/src/theme/typography";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

interface DeleteModalProps {
  visible: boolean;
  productIds: number[];
  onClose: () => void;
  onDelete: () => void;
}

export default function DeleteModal({
  visible,
  productIds,
  onDelete,
  onClose,
}: DeleteModalProps) {
  const { products, deleteProductBulk } = useInventoryController();
  const deleteToDB = async () => {
    await deleteProductBulk(productIds);
    onDelete();
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
          <Text style={styles.headerText}>This is a Delete Modal</Text>
          <View style={styles.actionBtnFrame}>
            <Pressable
              onPress={onClose}
              style={[styles.cancelBtn, styles.actionBtn]}
            >
              <Text style={[styles.cancelBtnText, styles.btnText]}>Cancel</Text>
            </Pressable>
            <Pressable
              onPress={deleteToDB}
              style={[styles.deleteBtn, styles.actionBtn]}
            >
              <Text style={[styles.deleteBtnText, styles.btnText]}>Delete</Text>
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
  headerText: {
    ...VarTypo.body.b2,
    color: VarColors.secondary.c500,
  },
  actionBtnFrame: {
    flexDirection: "row",
    marginTop: "3%",
    gap: "2%",
  },
  actionBtn: {
    flex: 2,
    alignItems: "center",
    padding: 8,
    borderRadius: VarContainers.radius.s4,
  },
  cancelBtn: {
    borderWidth: VarContainers.stroke.s0,
    borderColor: VarColors.neutral.c200,
  },
  deleteBtn: {
    backgroundColor: VarColors.primary.c300,
  },
  btnText: {
    ...VarTypo.body.b4_sb,
  },
  cancelBtnText: {
    color: VarColors.secondary.c500,
  },
  deleteBtnText: {
    color: VarColors.neutral.c100,
  },
});
