import { initDB } from "@/src/db/sqlite";
import VarColors from "@/src/theme/colors";
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
import { useEffect } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MD3LightTheme, MD3Theme, PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  useEffect(() => {
    initDB();
  }, []);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });
  console.log("Font is: " + fontsLoaded);

  const theme: MD3Theme = {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: VarColors.secondary.c500,
      secondary: "#03dac6",
      onSurface: VarColors.neutral.c800,
    },
    fonts: {
      ...MD3LightTheme.fonts,
      bodyMedium: {
        ...MD3LightTheme.fonts.bodyMedium,
        fontFamily: "Inter",
        fontWeight: "500" as const, // ✅ force literal type
      },
    },
  };

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <StatusBar hidden={true} />
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
      </PaperProvider>
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
