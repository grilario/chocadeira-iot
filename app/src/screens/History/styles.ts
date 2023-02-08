import { TextStyled } from "@components/Text/styles";
import { Text as TitleStyled } from  "@components/Title/styles"
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`;

export const Item = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
`;

export const Title = styled(TitleStyled)`
  padding: 0 20px;
`

export const Text = styled(TextStyled)`
  font-family: ${(props) => props.theme.fonts.openSansBold};
`;

export const TimeIndicator = styled(TextStyled)`
  color: ${(props) => props.theme.colors.textSecondary};
`;

export const Separator = styled.View`
  width: 100%;
  height: 1.5px;
  background-color: #f4f4f4;
`;
