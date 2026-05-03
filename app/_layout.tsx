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
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { useNavigationState } from "@react-navigation/native";
import { Drawer } from "expo-router/drawer";
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

function CustomSideber({ navigation }: DrawerContentComponentProps) {
  const currentRouteName = useNavigationState((state) => {
    const route = state.routes[state.index];

    // Drawer routes may contain nested state for the active child
    if (route.state) {
      const nested = route.state;
      return nested.routes[nested.index ?? 0].name;
    }

    return route.name;
  });

  useEffect(() => {
    console.log("Drawer active route: " + currentRouteName);
  }, [currentRouteName]);

  const screenNames = [
    "dashboard",
    "scan",
    "inventory",
    "transactions",
    "utang",
  ];

  const iconNames: IoniconName[] = [
    "easel-outline",
    "scan-sharp",
    "albums-outline",
    "receipt-outline",
    "wallet-outline",
  ];

  const capFirst = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s);

  const navComponent = (navName: string, iconName: string, key: number) => (
    <TouchableOpacity
      key={key}
      onPress={() => navigation.navigate(navName)}
      style={[
        styles.navContent,
        navName === currentRouteName
          ? [styles.drawerHL, styles.dropdown]
          : styles.drawerNM,
      ]}
    >
      <Ionicons
        name={iconNames[key]}
        size={30}
        color={
          navName === currentRouteName
            ? VarColors.neutral.c100
            : VarColors.neutral.c700
        }
      />
      <Text
        style={[
          styles.navText,
          navName === currentRouteName ? styles.textHL : styles.textNM,
        ]}
      >
        {capFirst(navName)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.navView}>
      <View style={styles.topNav}>
        <TouchableOpacity onPress={() => {}} style={styles.navContent}>
          <Ionicons name="people-circle" size={35} color="grey" />
          <Text style={styles.navText}>Dapuni</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.screenNav}>
        {screenNames.map((screen, index) =>
          navComponent(screen, iconNames[index], index),
        )}
      </View>
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => {}} style={styles.navContent}>
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
