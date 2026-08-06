import { initDB } from "@/src/db/sqlite";
import VarColors from "@/src/theme/colors";
import VarContainers from "@/src/theme/containers";
import VarTypo from "@/src/theme/typography";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { Ionicons } from "@expo/vector-icons";
import { Drawer, DrawerContentComponentProps } from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MD3LightTheme, MD3Theme, PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  useEffect(() => {
    initDB();
  }, []);

  useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

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
        fontWeight: "500" as const,
      },
    },
  };

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <StatusBar hidden={true} />
        <Drawer
          drawerContent={(props) => <CustomSidebar {...props} />}
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
          <Drawer.Screen
            name="dashboard"
            options={{ drawerLabel: "Dashboard" }}
          />
          <Drawer.Screen name="scan" options={{ drawerLabel: "Scan" }} />
          <Drawer.Screen
            name="inventory"
            options={{ drawerLabel: "Inventory" }}
          />
          <Drawer.Screen
            name="transactions"
            options={{ drawerLabel: "Transactions" }}
          />
          <Drawer.Screen name="utang" options={{ drawerLabel: "Utang" }} />
        </Drawer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

type DrawerItem = {
  name: string;
  label: string;
  icon: IoniconName;
};

const DRAWER_ITEMS: DrawerItem[] = [
  { name: "dashboard", label: "Dashboard", icon: "easel-outline" },
  { name: "scan", label: "Scan", icon: "scan-sharp" },
  { name: "inventory", label: "Inventory", icon: "albums-outline" },
  { name: "transactions", label: "Transactions", icon: "receipt-outline" },
  { name: "utang", label: "Utang", icon: "wallet-outline" },
];

function CustomSidebar({ navigation, state }: DrawerContentComponentProps) {
  const currentRouteName = state.routes[state.index].name;

  useEffect(() => {
    if (__DEV__) {
      console.log("Drawer active route: " + currentRouteName);
    }
  }, [currentRouteName]);

  const renderNavItem = ({ name, label, icon }: DrawerItem) => {
    const isActive = name === currentRouteName;
    return (
      <TouchableOpacity
        key={name}
        accessibilityRole="button"
        accessibilityLabel={label}
        onPress={() => navigation.navigate(name)}
        style={[
          styles.navContent,
          isActive ? [styles.drawerHL, styles.dropdown] : styles.drawerNM,
        ]}
      >
        <Ionicons
          name={icon}
          size={30}
          color={isActive ? VarColors.neutral.c100 : VarColors.neutral.c700}
        />
        <Text
          style={[styles.navText, isActive ? styles.textHL : styles.textNM]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.navView}>
      <View style={styles.topNav}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Profile"
          onPress={() => {
            // TODO: navigate to profile
          }}
          style={styles.navContent}
        >
          <Ionicons
            name="people-circle"
            size={35}
            color={VarColors.neutral.c500}
          />
          <Text style={styles.navText}>Dapuni</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.screenNav}>{DRAWER_ITEMS.map(renderNavItem)}</View>

      <View style={styles.bottomNav}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Logout"
          onPress={() => {
            // TODO: implement logout
          }}
          style={styles.navContent}
        >
          <Ionicons
            name="log-out-outline"
            size={30}
            color={VarColors.red.c200}
          />
          <Text style={[styles.navText, { color: VarColors.red.c200 }]}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navView: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: VarColors.neutral.c100,
  },
  topNav: { flex: 1 },
  screenNav: {
    flex: 3,
    justifyContent: "center",
    gap: 20,
    alignItems: "center",
  },
  bottomNav: { flex: 1 },
  navText: {
    fontSize: 10,
    color: VarColors.neutral.c700,
  },
  navContent: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70,
    gap: 5,
    borderRadius: VarContainers.radius.s4,
  },
  drawerNM: {
    backgroundColor: "transparent",
  },
  drawerHL: {
    backgroundColor: "orange",
  },
  textHL: {
    ...VarTypo.body.b5_sb,
    color: "white",
  },
  textNM: {
    ...VarTypo.body.b5,
    color: VarColors.neutral.c700,
  },
  dropdown: {
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    // Android shadow
    elevation: 5,
  },
});
