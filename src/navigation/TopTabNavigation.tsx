import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView } from "react-native-safe-area-context";

import Control from "../screens/Control";
import History from "../screens/History";
import Monitoring from "../screens/Monitoring";

const Tab = createMaterialTopTabNavigator();

export default function TopTabNavigation() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator>
        <Tab.Screen name="monitoring" component={Monitoring} />
        <Tab.Screen name="control" component={Control} />
        <Tab.Screen name="history" component={History} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
