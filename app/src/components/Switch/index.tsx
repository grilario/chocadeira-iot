import { useEffect } from "react";
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "styled-components/native";

import { Container, Indicator } from "./styles";

interface ISwitchProps {
  onToggle: () => void;
  value: boolean;
}

export default function Switch({ onToggle, value }: ISwitchProps) {
  const offset = useSharedValue(0);

  const { colors } = useTheme()

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(offset.value, {
            duration: 50,
            easing: Easing.ease,
          }),
        },
      ],
    };
  });

  useEffect(() => {
    value ? (offset.value = 20) : (offset.value = 0);
  }, [value]);

  return (
    <Container onPress={onToggle} bg={value ? colors.primary : "#B8B8B8"}>
      <Indicator style={[animatedStyle]} />
    </Container>
  );
}
