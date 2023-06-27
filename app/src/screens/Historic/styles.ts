import styled from "styled-components/native";

export const Title = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};
`;

export const HistoricItem = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
`;

export const HistoricLabel = styled.Text`
  font-weight: 400;
`;

export const HistoricTime = styled.Text`
  color: ${(props) => props.theme.colors.textSecondary};
`;

export const Separator = styled.View`
  width: 100%;
  height: 1.5px;
  opacity: 0.18;
  border-radius: 999px;
  background-color: ${(props) => props.theme.colors.textSecondary};
`;
