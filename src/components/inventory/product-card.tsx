import { Product } from "@/src/models/Product";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <View>
      <View style={styles.imgFrame}></View>
      <Text style={styles.prodName}>{product.name}</Text>
      <View>
        <Ionicons />
        <Text style={styles.prodBarCate}>{product.barcode}</Text>
        <Ionicons />
        <Text style={styles.prodBarCate}>{product.name}</Text>
      </View>
      <View style={styles.statusFrame}>
        <Ionicons />
        <Text style={styles.statusText}>{product.status}</Text>
      </View>
      <View style={styles.numbersRow}>
        <Text style={styles.numberRowTextA}>Quantity</Text>
        <Text style={styles.numberRowTextB}>{product.quantity}</Text>
      </View>
      <View style={styles.numbersRow}>
        <Text style={styles.numberRowTextA}>Cost Price</Text>
        <Text style={styles.numberRowTextB}>{product.cost_price}</Text>
      </View>
      <View style={styles.numbersRow}>
        <Text style={styles.numberRowTextA}>Selling Price</Text>
        <Text style={styles.numberRowTextB}>{product.selling_price}</Text>
      </View>
      <View style={styles.numbersRow}>
        <Text style={styles.numberRowTextA}>Total Sales</Text>
        <Text style={styles.numberRowTextB}>P000.00</Text>
      </View>
      <View style={styles.editBtnFrame}>
        <Ionicons />
        <Text style={styles.editBtnText}>Edit</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  imgFrame: {},
  prodName: {},
  prodBarCate: {},
  statusFrame: {},
  statusText: {},
  numbersRow: {},
  numberRowTextA: {},
  numberRowTextB: {},
  editBtnFrame: {},
  editBtnText: {},
});
