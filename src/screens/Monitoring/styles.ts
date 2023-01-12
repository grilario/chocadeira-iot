import styled from "styled-components/native";
import { Text } from "@components/Title/styles";

export const Container = styled.ScrollView`
  flex: 1;
  padding: 0 20px;
`;

export const InfoStatus = styled.View`
  width: 100%;
  gap: 20px;
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled(Text)`
  margin-top: 20px;
  margin-bottom: 16px;
`;

export const Divider = styled.View`
  height: 20px;
`