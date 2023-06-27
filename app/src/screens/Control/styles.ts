import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: 20px 20px;
  gap: 32px;
`;

export const Section = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};
`;
