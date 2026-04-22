import { FlatList, StyleSheet, Text, View } from "react-native";

const cards = Array.from({ length: 12 }, (_, i) => `Card ${i + 1}`);

export default function InvCards() {
  return (
    <View>
      <Text>Card Tab View</Text>
      <FlatList
        data={cards}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        renderItem={({ item }) => (
          <View>
            <Text>{item}</Text>
          </View>
        )}
        contentContainerStyle={styles.containers}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containers: {},
  card: {},
});
