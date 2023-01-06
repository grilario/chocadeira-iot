import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Control from "../screens/Control";
import History from "../screens/History";
import Monitoring from "../screens/Monitoring";

const Tab = createMaterialTopTabNavigator();

export default function TopTabNavigation() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text
        style={{
          fontFamily: "OpenSans_600SemiBold",
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
            fontFamily: "OpenSans_600SemiBold",
            fontSize: 14,
            textTransform: "capitalize",
          },
          tabBarIndicatorStyle: {
            backgroundColor: "#4E9DEC",
          },
        }}
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
