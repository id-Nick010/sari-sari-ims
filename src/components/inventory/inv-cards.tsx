import { Product } from "@/src/models/Product";
import { FlatList, StyleSheet, View } from "react-native";
import ProductCard from "./product-card";

interface InvCardsProps {
  data: Product[];
}

export default function InvCards({ data }: InvCardsProps) {
  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(product, index) => index.toString()}
        numColumns={3}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <ProductCard product={item} />
          </View>
        )}
        contentContainerStyle={styles.container}
        columnWrapperStyle={{ justifyContent: "space-between" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    width: "32%",
    margin: 5,
    height: 100,
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
});
