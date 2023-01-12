import styled from "styled-components/native";

import { Text } from "@components/Title/styles";

export const Container = styled.View`
  width: 100%;
  margin: 20px 0;
`;

export const SliderContainer = styled.View`
  width: 100%;
  margin: 20px 0;
`;

export const LegendContainer = styled.View`
  margin-top: 8px;

  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 10px;
`;

export const Legend = styled(Text)`
  font-size: 11px;
  color: ${(props) => props.theme.colors.textSecondary};
`;

export const SubmitContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const PrimaryButton = styled.Pressable`
  width: 80px;
  align-items: center;

  background-color: ${(props) => props.theme.colors.primary};
  padding: 6px 0;
  border: 1px solid transparent;
  border-radius: 5px;
`;

export const SecondaryButton = styled.Pressable`
  width: 80px;
  align-items: center;

  padding: 6px 0;
  border-radius: 5px;
  border: 1px solid black;
`;
