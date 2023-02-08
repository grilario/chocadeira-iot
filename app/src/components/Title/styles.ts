import styled from "styled-components/native"

export const Text = styled.Text`
  font-family: ${props => props.theme.fonts.openSansBold};
  font-size: 14px;
  color: ${props => props.theme.colors.text};
`