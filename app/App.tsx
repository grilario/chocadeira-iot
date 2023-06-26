import { DefaultTheme as LightTime, NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider, DefaultTheme } from "styled-components/native";

import BottomTabNavigation from "@navigation/BottomTabNavigation";

export const theme: DefaultTheme = {
  colors: {
    primary: "#4E9DEC",
    white: "#fbfefb",
    text: "#1d1d1f",
    textSecondary: "#8694A9",
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <NavigationContainer theme={{ dark: false, colors: { ...LightTime.colors, background: theme.colors.white } }}>
          <BottomTabNavigation />
          <StatusBar style="dark" translucent />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
