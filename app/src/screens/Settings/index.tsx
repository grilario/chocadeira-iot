import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import Home from "@screens/Settings/Home";
import Assistant from "@screens/Settings/Assistant";
import WiFi from "@screens/Settings/WiFi";

const Stack = createStackNavigator();

export default function Settings() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        gestureDirection: "horizontal",
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Assistant" component={Assistant} />
      <Stack.Screen name="WiFi" component={WiFi} />
    </Stack.Navigator>
  );
}
