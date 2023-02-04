import styled from "styled-components/native"

export const TextStyled = styled.Text`
  font-family: ${props => props.theme.fonts.openSans};
  font-size: 12px;
  color: ${props => props.theme.colors.text};
`
