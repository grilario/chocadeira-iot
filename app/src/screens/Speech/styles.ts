import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: 20px 20px;
  gap: 20px;
`;

export const Section = styled.View`
  flex: 1;
  gap: 12px;
`;

export const Title = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};
`;

export const ResultContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.white};
`;

export const ResultMessage = styled.Text`
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
`;

export const MessageContainer = styled.View`
  position: absolute;
  width: 100%;
  bottom: 0px;
  padding: 30px 20px 34px;
  align-items: center;
  justify-content: center;
  border-color: ${(props) => props.theme.colors.secondary};
  border-top-width: 0.6px ;
  border-top-left-radius: 22px;
  border-top-right-radius: 22px;
  background-color: ${(props) => props.theme.colors.white};
`;

export const MessageText = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};
  text-align: justify;
`;
