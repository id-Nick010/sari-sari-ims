import { Product } from "@/src/models/Product";
import VarColors from "@/src/theme/colors";
import VarTypo from "@/src/theme/typography";
import { Image, StyleSheet, Text, View } from "react-native";
import { DataTable } from "react-native-paper";
interface InvTableProps {
  data: Product[];
}

export default function InvTable({ data }: InvTableProps) {
  const renderProduct = data.map((p) => (
    <DataTable.Row style={styles.row} key={p.id}>
      <DataTable.Cell style={{ flex: 1 }}>
        <Text style={styles.cellText}>__</Text>
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
        <Text style={styles.cellText}>OO Edit</Text>
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
        {renderProduct}
      </DataTable>
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
    width: "15%",
    aspectRatio: 1 / 1,
  },
});
