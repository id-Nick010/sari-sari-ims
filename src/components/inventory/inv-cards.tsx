import { Product } from "@/src/models/Product";
import VarColors from "@/src/theme/colors";
import VarContainers from "@/src/theme/containers";
import { FlatList, StyleSheet, View } from "react-native";
import ProductCard from "./product-card";

interface InvCardsProps {
  data: Product[];
  onEditRefresh: () => void;
}

export default function InvCards({ data, onEditRefresh }: InvCardsProps) {
  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(data, index) => index.toString()}
        numColumns={3}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <ProductCard data={item} onEditRefresh={onEditRefresh} />
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
    alignItems: "center",
    justifyContent: "center",
    borderWidth: VarContainers.stroke.s1,
    borderRadius: 8,
    borderColor: VarColors.secondary.c100,
  },
});
