import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Activity, GameController, Microphone, ClockClockwise, Gear } from "phosphor-react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components/native";

import Control from "@screens/Control";
import Historic from "@screens/Historic";
import Monitoring from "@screens/Monitoring";
import Settings from "@screens/Settings";
import Speech from "@screens/Speech";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigation() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: colors.primary,
          tabBarStyle: { height: 56, elevation: 0, backgroundColor: "#ffffff" },
        }}
      >
        <Tab.Screen
          name="Monitoring"
          component={Monitoring}
          options={{
            tabBarIcon: ({ color, size }) => <Activity size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="Control"
          component={Control}
          options={{
            tabBarIcon: ({ color, size }) => <GameController size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="Speech"
          component={Speech}
          options={{
            tabBarIcon: ({ focused, size }) => (
              <View
                style={{
                  backgroundColor: colors.primary,
                  padding: 16,
                  borderRadius: 999,
                  transform: [{ translateY: -12 }],
                }}
              >
                <Microphone size={size} color={colors.white} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Historic"
          component={Historic}
          options={{
            tabBarIcon: ({ color, size }) => <ClockClockwise size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({ color, size }) => <Gear size={size} color={color} />,
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
