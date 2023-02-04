import styled from "styled-components/native";

import { Text as TextStyled } from "@components/Title/styles";

interface ButtonProps {
  active?: boolean;
}

export const Container = styled.View`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
`;

export const Title = styled(TextStyled)`
  font-size: 14px;
`;

export const Legend = styled(TextStyled)`
  font-size: 12px;
  color: ${(props) => props.theme.colors.textSecondary};
`;

export const Tab = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

export const Button = styled.Pressable<ButtonProps>`
  width: 26px;
  height: 26px;
  align-items: center;
  justify-content: center;
  border: ${(props) => (props.active ? "none" : "1px solid #000")};
  background-color: ${(props) =>
    props.active ? props.theme.colors.primary : "#ffffff"};
  border-radius: 2px;
  margin-left: 16px;
`;

export const Text = styled(TextStyled)<ButtonProps>`
  font-size: 12px;
  font-family: ${(props) => props.theme.fonts.openSansBold};
  color: ${(props) => (props.active ? "#ffffff" : props.theme.colors.text)};
`;
