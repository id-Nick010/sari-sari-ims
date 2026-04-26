import { Product } from "@/src/models/Product";
import VarColors from "@/src/theme/colors";
import VarContainers from "@/src/theme/containers";
import VarTypo from "@/src/theme/typography";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import ProductCard from "./product-card";

interface InvCardsProps {
  data: Product[];
  onEditRefresh: () => void;
}

export default function InvCards({ data, onEditRefresh }: InvCardsProps) {
  const itemsPerPage = 10;
  const [page, setPage] = useState(1);

  const paginatedData = data.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  const maxPage = Math.ceil(data.length / itemsPerPage);

  useEffect(() => console.log("curr page: " + page), [page]);

  return (
    <View>
      <FlatList
        data={paginatedData}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <ProductCard data={item} onEditRefresh={onEditRefresh} />
          </View>
        )}
        contentContainerStyle={styles.container}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        ListFooterComponent={
          <View style={styles.footerRow}>
            <Text style={styles.shownDataDetailText}>
              Showing <Text style={styles.shownHL}>{paginatedData.length}</Text>{" "}
              of <Text style={styles.shownHL}>{data.length}</Text> items
            </Text>
            <View
              style={{
                flexDirection: "row",
                gap: 5,
              }}
            >
              <Pressable
                style={[styles.pageBtn, styles.inactivePageBtn]}
                onPress={() => {
                  setPage((prev) => (prev === 1 ? prev : prev - 1));
                }}
              >
                <Ionicons
                  style={styles.pageIcon}
                  name="chevron-back-outline"
                  size={18}
                />
              </Pressable>
              {[...Array(maxPage)].map((_, i) => (
                <Pressable
                  style={[
                    styles.pageBtn,
                    page === i + 1
                      ? styles.activePageBtn
                      : styles.inactivePageBtn,
                  ]}
                  key={i}
                  onPress={() => setPage(i + 1)}
                >
                  <Text
                    style={[
                      styles.pageText,
                      page === i + 1
                        ? styles.activePageText
                        : styles.inactivePageText,
                    ]}
                  >
                    {(i + 1).toString()}
                  </Text>
                </Pressable>
              ))}
              <Pressable
                style={[styles.pageBtn, styles.inactivePageBtn]}
                onPress={() => {
                  setPage((prev) => (prev === maxPage ? prev : prev + 1));
                }}
              >
                <Ionicons
                  style={styles.pageIcon}
                  name="chevron-forward-outline"
                  size={18}
                />
              </Pressable>
            </View>
          </View>
        }
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
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  shownDataDetailText: {
    ...VarTypo.body.b3,
    color: VarColors.neutral.c600,
  },
  shownHL: {
    ...VarTypo.body.b3_m,
  },
  pageBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 35,
    aspectRatio: 1 / 1,
    borderRadius: VarContainers.radius.s5,
  },
  activePageBtn: {
    backgroundColor: VarColors.primary.c300,
    borderWidth: 0,
  },
  inactivePageBtn: {
    backgroundColor: VarColors.neutral.c100,
    borderColor: VarColors.neutral.c200,
    borderWidth: VarContainers.stroke.s0,
  },
  pageIcon: {
    color: VarColors.neutral.c700,
  },
  pageText: {
    ...VarTypo.body.b3_m,
  },
  activePageText: {
    color: VarColors.neutral.c100,
  },
  inactivePageText: {
    color: VarColors.secondary.c500,
  },
});
