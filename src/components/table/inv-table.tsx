import { Product } from "@/src/models/Product";
import { FlatList, StyleSheet, Text, View } from "react-native";

interface InvTableProps {
  data: Product[];
}

export default function InvTable({ data }: InvTableProps) {
  const renderHeader = () => (
    <View style={[styles.row, styles.headerRow]}>
      <Text style={[styles.cell, styles.headerCell]}>Id</Text>
      <Text style={[styles.cell, styles.headerCell]}>Name</Text>
      <Text style={[styles.cell, styles.headerCell]}>Code</Text>
      <Text style={[styles.cell, styles.headerCell]}>Selling Price</Text>
    </View>
  );

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.barcode}</Text>
      <Text style={styles.cell}>{item.selling_price.toFixed(2)}</Text>
    </View>
  );

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", borderBottomWidth: 1, borderColor: "#ccc" },
  cell: { flex: 1, textAlign: "center", padding: 8 },
  headerCell: { fontWeight: "bold" },
  headerRow: { backgroundColor: "#eee" },
});
