import styled from "styled-components/native";
import Animated from "react-native-reanimated";


export const Container = styled.View`
  flex: 1;
  padding: 20px 20px;
`;

export const Section = styled.View`
  margin-top: 20px;
`;

export const Title = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};
`;

export const SensorContainer = styled.View`
  justify-content: space-between;
  flex-direction: row;
`;

export const GraphContainer = styled.View`
  width: 100%;
  border-radius: 8px;
  margin-top: 20px;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.white};
`;

export const NavigationContainer = styled.View`
  position: relative;
  flex-direction: row;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 20px;
  border-radius: 999px;
  background-color: ${(props) => props.theme.colors.secondary};
`;

export const Navigator = styled.Pressable`
  width: 33.333%;
  z-index: 0;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  /* background-color: ${(props) => props.theme.colors.secondary}; */
`;

export const NavigatorIndicator = styled(Animated.View)`
  position: absolute;
  z-index: 0;
  width: 33.333%;
  height: 100%;
  border-radius: 999px;
  background-color: ${(props) => props.theme.colors.primary};
`;

export const NavigatorLegend = styled.Text<{ selected?: boolean }>`
  z-index: 10;
  font-weight: 600;
  color: ${({ theme, selected }) => (selected ? theme.colors.white : theme.colors.text)};
  padding: 4px;
`;
