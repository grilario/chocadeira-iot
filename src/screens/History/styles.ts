import { TextStyled } from "@components/Text/styles";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`;

export const Item = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
`;

export const Text = styled(TextStyled)`
  font-family: ${(props) => props.theme.fonts.openSansBold};
`;

export const TimeIndicator = styled(TextStyled)`
  color: ${(props) => props.theme.colors.textSecondary};
`;
