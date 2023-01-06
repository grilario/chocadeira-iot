import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import TopTabNavigation from "./src/navigation/TopTabNavigation";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <TopTabNavigation />
        <StatusBar style="auto" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
