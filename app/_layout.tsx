import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { Ionicons } from "@expo/vector-icons";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });
  console.log("Font is: " + fontsLoaded);

  return (
    <SafeAreaProvider>
      <Drawer
        drawerContent={(props) => <CustomSideber {...props} />}
        screenOptions={{
          drawerType: "permanent",
          headerShown: false,
          drawerStyle: {
            width: 80,
            backgroundColor: "#666666",
          },
        }}
      >
        {/* Don't Use this */}
        <Drawer.Screen name="index" options={{ drawerLabel: "Home" }} />
        <Drawer.Screen
          name="inventory"
          options={{ drawerLabel: "Inventory" }}
        />
      </Drawer>
    </SafeAreaProvider>
  );
}

function CustomSideber({ navigation }: DrawerContentComponentProps) {
  return (
    <View style={styles.navView}>
      <TouchableOpacity
        onPress={() => navigation.navigate("index")}
        style={styles.navContent}
      >
        <Ionicons name="home-outline" size={30} color="white" />
        <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("inventory")}
        style={styles.navContent}
      >
        <Ionicons name="cube-outline" size={30} color="white" />
        <Text style={styles.navText}>Inventory</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navView: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
    paddingBlock: 30,
    alignItems: "center",
  },
  navText: {
    fontSize: 13,
    color: "white",
  },
  navContent: {
    alignItems: "center",
    marginBlock: 20,
  },
});
