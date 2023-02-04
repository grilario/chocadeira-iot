import styled from "styled-components/native";
import { TextStyled } from "@components/Text/styles";

export const Container = styled.View`
  width: 30%;
  padding: 22px 12px;
  background-color: #fff;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

export const Title = styled(TextStyled)`
  margin-top: 8px;
  font-family: ${props => props.theme.fonts.openSansBold};
`;

export const Text = styled(TextStyled)`
  margin-top: 2px;
  font-family: ${props => props.theme.fonts.openSansBold};
  color: ${props => props.theme.colors.textSecondary};
`;
