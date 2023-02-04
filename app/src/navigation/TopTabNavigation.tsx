import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "styled-components";

import Control from "../screens/Control";
import History from "../screens/History";
import Monitoring from "../screens/Monitoring";

const Tab = createMaterialTopTabNavigator();

export default function TopTabNavigation() {
  const theme = useTheme();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text
        style={{
          fontFamily: theme.fonts.openSansBold,
          fontSize: 18,
          fontWeight: "600",
          marginLeft: 14,
          marginTop: 12,
          marginBottom: 8,
        }}
      >
        Chocadeira
      </Text>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            fontFamily: theme.fonts.openSansBold,
            fontSize: 14,
            textTransform: "capitalize",
          },
          tabBarIndicatorStyle: {
            backgroundColor: theme.colors.primary,
          },
        }}
        sceneContainerStyle={{ backgroundColor: "#F8F8F8" }}
      >
        <Tab.Screen
          name="monitoring"
          component={Monitoring}
          options={{ tabBarLabel: "Monitoramento" }}
        />
        <Tab.Screen
          name="control"
          component={Control}
          options={{ tabBarLabel: "Controle" }}
        />
        <Tab.Screen
          name="history"
          component={History}
          options={{ tabBarLabel: "Histórico" }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
