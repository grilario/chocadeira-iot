import styled from "styled-components/native";
import Animated from "react-native-reanimated";

export const Container = styled.Pressable<{ bg: string; }>`
  width: 44px;
  height: 22px;
  padding: 2px;
  justify-content: center;
  border-radius: 999px;
  background: ${(props) => props.bg};
`;

export const Indicator = styled(Animated.View)`
  width: 20px;
  height: 20px;
  border-radius: 999px;
  background: #ffffff;
`;
