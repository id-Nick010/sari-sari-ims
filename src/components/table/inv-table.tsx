import { Product } from "@/src/models/Product";
import VarColors from "@/src/theme/colors";
import VarContainers from "@/src/theme/containers";
import VarTypo from "@/src/theme/typography";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { DataTable } from "react-native-paper";
import CheckBox from "../check-box";
import EditModal from "../modals/edit-modal";
interface InvTableProps {
  data: Product[];
  onEditRefresh: () => void;
}

const numberOfItemsPerPageList = [5, 10, 15];

export default function InvTable({ data, onEditRefresh }: InvTableProps) {
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0],
  );
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, data.length);

  //row checkbox rules
  const [checkedIds, setCheckedIds] = useState<number[]>([]);

  //modal rules
  const [editModalOpen, setEditModalOpen] = useState({
    isVisible: false,
    dataId: -1,
  });

  const toggleSelection = (id: number, newValue: boolean) => {
    setCheckedIds((curr) => {
      if (newValue) {
        return curr.includes(id) ? curr : [...curr, id];
      } else {
        return curr.filter((x) => x !== id);
      }
    });
  };

  useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);

  const renderRows = data.slice(from, to).map((p) => (
    <DataTable.Row style={styles.row} key={p.id}>
      <DataTable.Cell style={{ flex: 1 }}>
        <CheckBox
          checked={checkedIds.includes(p.id)}
          onChange={(newValue) => toggleSelection(p.id, newValue)}
        />
      </DataTable.Cell>
      <DataTable.Cell style={[styles.cell, { flex: 5 }]}>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={require("@/assets/images/react-logo.png")}
            style={styles.rowImg}
          />
          <View>
            <Text style={styles.cellText}>{p.name} </Text>
            <Text
              onPress={() => console.log("btn clicked")}
              style={styles.cellText}
            >
              {p.barcode}
            </Text>
          </View>
        </View>
      </DataTable.Cell>
      <DataTable.Cell style={styles.cell}>
        <Text style={styles.cellText}>{p.category}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.cell}>
        <Text style={styles.cellText}>{p.quantity}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.cell}>
        <Text style={styles.cellText}>{p.cost_price}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.cell}>
        <Text style={styles.cellText}>{p.selling_price}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.cell}>
        <Text style={styles.cellText}>000.00</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.cell}>
        <Text style={styles.cellText}>{p.status}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.cell}>
        <Text style={styles.cellText}>
          <Pressable
            style={styles.editBtn}
            onPress={() => setEditModalOpen({ isVisible: true, dataId: p.id })}
          >
            <Ionicons name="create-outline" size={15} />
            <Text>Edit</Text>
          </Pressable>
        </Text>
      </DataTable.Cell>
    </DataTable.Row>
  ));

  return (
    <View>
      <DataTable>
        <DataTable.Header style={styles.row}>
          <DataTable.Title style={{ flex: 1 }}>
            <Text style={styles.cellText}>
              <Text style={styles.cellText}>__</Text>
            </Text>
          </DataTable.Title>
          <DataTable.Title style={{ flex: 5 }}>
            <Text style={styles.cellText}> Item Name</Text>
          </DataTable.Title>
          <DataTable.Title style={styles.cell}>
            <Text style={styles.cellText}>Category</Text>
          </DataTable.Title>
          <DataTable.Title style={styles.cell}>
            <Text style={styles.cellText}>Quantity</Text>
          </DataTable.Title>
          <DataTable.Title style={styles.cell}>
            <Text style={styles.cellText}>Cost Price</Text>
          </DataTable.Title>
          <DataTable.Title style={styles.cell}>
            <Text style={styles.cellText}>Selling Price</Text>
          </DataTable.Title>
          <DataTable.Title style={styles.cell}>
            <Text style={styles.cellText}>Sales</Text>
          </DataTable.Title>
          <DataTable.Title style={styles.cell}>
            <Text style={styles.cellText}>Status</Text>
          </DataTable.Title>
          <DataTable.Title style={styles.cell}>
            <Text style={styles.cellText}>Actions</Text>
          </DataTable.Title>
        </DataTable.Header>
        <ScrollView>{renderRows}</ScrollView>
        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(data.length / numberOfItemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${data.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={numberOfItemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          selectPageDropdownLabel={"Rows/page:"}
        />
      </DataTable>
      <EditModal
        visible={editModalOpen.isVisible}
        onClose={() => {
          setEditModalOpen((prev) => ({ isVisible: false, dataId: -1 }));
        }}
        dataId={editModalOpen.dataId}
        onEdit={onEditRefresh}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  cell: {
    flex: 2,
    textAlign: "center",
    paddingBlock: 10,
  },
  cellText: {
    ...VarTypo.body.b3,
    color: VarColors.secondary.c300,
  },
  headerCell: {
    fontWeight: "bold",
  },
  headerRow: {
    backgroundColor: "#eee",
  },
  rowImg: {
    width: 45,
    aspectRatio: 1 / 1,
  },
  editBtn: {
    gap: 5,
    padding: "9%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: VarContainers.radius.s2,
    borderWidth: VarContainers.stroke.s1,
    borderColor: VarColors.neutral.c200,
  },
});
