import { Product } from "@/src/models/Product";
import VarColors from "@/src/theme/colors";
import VarContainers from "@/src/theme/containers";
import VarTypo from "@/src/theme/typography";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { DataTable } from "react-native-paper";
import CheckBox from "../check-box";
import EditModal from "../modals/edit-modal";
interface InvTableProps {
  data: Product[];
  checkedIds: number[];
  setCheckedIds: React.Dispatch<React.SetStateAction<number[]>>;
  onEditRefresh: () => void;
}

const numberOfItemsPerPageList = [6, 10, 15];

export default function InvTable({
  data,
  checkedIds,
  setCheckedIds,
  onEditRefresh,
}: InvTableProps) {
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0],
  );
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, data.length);

  //modal rules
  const [editModalOpen, setEditModalOpen] = useState({
    isVisible: false,
    dataId: -1,
  });

  const toggleSelection = useCallback(
    (id: number, newValue: boolean) => {
      setCheckedIds((curr) => {
        if (newValue) {
          return curr.includes(id) ? curr : [...curr, id];
        } else {
          return curr.filter((x) => x !== id);
        }
      });
    },
    [setCheckedIds],
  );

  useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);

  const pageData = useMemo(() => data.slice(from, to), [data, from, to]);

  const renderItem = useCallback(
    ({ item }: { item: Product }) => {
      return (
        <DataTable.Row style={styles.row} key={item.id}>
          <DataTable.Cell style={{ flex: 1 }}>
            <CheckBox
              checked={checkedIds.includes(item.id)}
              onChange={(newValue) => toggleSelection(item.id, newValue)}
            />
          </DataTable.Cell>

          <DataTable.Cell style={[styles.cell, { flex: 5 }]}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("@/assets/images/react-logo.png")}
                style={styles.rowImg}
              />
              <View style={{ marginLeft: 8 }}>
                <Text style={styles.cellText}>{item.name}</Text>
                <Text
                  onPress={() => console.log("btn clicked")}
                  style={styles.cellText}
                >
                  {item.barcode}
                </Text>
              </View>
            </View>
          </DataTable.Cell>

          <DataTable.Cell style={styles.cell}>
            <Text style={styles.cellText}>{item.category}</Text>
          </DataTable.Cell>

          <DataTable.Cell style={styles.cell}>
            <Text style={styles.cellText}>{item.quantity}</Text>
          </DataTable.Cell>

          <DataTable.Cell style={styles.cell}>
            <Text style={styles.cellText}>{item.cost_price}</Text>
          </DataTable.Cell>

          <DataTable.Cell style={styles.cell}>
            <Text style={styles.cellText}>{item.selling_price}</Text>
          </DataTable.Cell>

          <DataTable.Cell style={styles.cell}>
            <Text style={styles.cellText}>000.00</Text>
          </DataTable.Cell>

          <DataTable.Cell style={styles.cell}>
            <Text style={styles.cellText}>{item.status}</Text>
          </DataTable.Cell>

          <DataTable.Cell style={styles.cell}>
            <Pressable
              style={styles.editBtn}
              onPress={() =>
                setEditModalOpen({ isVisible: true, dataId: item.id })
              }
            >
              <Ionicons name="create-outline" size={15} />
              <Text>Edit</Text>
            </Pressable>
          </DataTable.Cell>
        </DataTable.Row>
      );
    },
    [checkedIds, toggleSelection],
  );

  const selectAllOrReset = useCallback(() => {
    if (checkedIds.length > 0) {
      setCheckedIds([]);
    } else {
      setCheckedIds(data.map((d) => d.id));
    }
  }, [checkedIds.length, data, setCheckedIds]);

  return (
    <View>
      <DataTable>
        <FlatList
          data={pageData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          scrollEnabled={false}
          ListHeaderComponent={
            <View style={{ backgroundColor: "#fff", elevation: 4, zIndex: 10 }}>
              <DataTable.Header style={styles.row}>
                <DataTable.Title style={{ flex: 1 }}>
                  <Text style={styles.cellText} onPress={selectAllOrReset}>
                    <Text style={styles.cellText}>
                      {checkedIds.length > 0 ? (
                        <Ionicons name="checkmark-done-outline" size={20} />
                      ) : (
                        <Ionicons name="git-commit-outline" size={20} />
                      )}
                      {checkedIds.length > 0 ? checkedIds.length : ""}
                    </Text>
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
            </View>
          }
          ListFooterComponent={
            <View
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 15,
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  flex: 3,
                  color: VarColors.neutral.c600,
                  ...VarTypo.body.b3,
                }}
              >
                Showing <Text style={styles.textHL}>{pageData.length}</Text> of{" "}
                <Text style={styles.textHL}>{data.length}</Text> items
              </Text>
              <DataTable.Pagination
                style={{ flex: 2 }}
                page={page}
                numberOfPages={Math.ceil(data.length / numberOfItemsPerPage)}
                onPageChange={(page) => setPage(page)}
                label={`${from + 1}-${to} of ${data.length}`}
                numberOfItemsPerPageList={numberOfItemsPerPageList}
                numberOfItemsPerPage={numberOfItemsPerPage}
                onItemsPerPageChange={onItemsPerPageChange}
                selectPageDropdownLabel={"Rows:"}
              />
            </View>
          }
          stickyHeaderIndices={[0]}
          style={styles.list}
          removeClippedSubviews={true}
        />
      </DataTable>
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
  list: { flexGrow: 1 },
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
  textHL: {
    ...VarTypo.body.b3_m,
  },
});
