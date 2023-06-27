import styled from "styled-components/native";

export const Container = styled.View`
  width: 48.5%;
  flex-grow: 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 4px;

  background-color: ${(props) => props.theme.colors.white};
  border-radius: 10px;
  padding: 20px 18px;
`;

export const Slug = styled.Text`
  font-size: 12px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.text};
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: 800;
  color: ${(props) => props.theme.colors.text};
`;

export const Icon = styled.View`
  align-items: center;
`;
