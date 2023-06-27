import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: 20px 20px;
  gap: 20px;
`;

export const Section = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.white};
  padding: 12px;
  border-radius: 8px;
`;

export const Title = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};
`;

export const Label = styled.Text`
  font-weight: 500;
  color: ${(props) => props.theme.colors.text};
`;

export const Option = styled.Pressable`
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

export const IconContainer = styled.View`
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background-color: ${(props) => props.theme.colors.primary};
`;

export const Separator = styled.View`
  width: 100%;
  margin: 8px 0;
  height: 1.5px;
  opacity: 0.18;
  border-radius: 999px;
  background-color: ${(props) => props.theme.colors.textSecondary};
`;

export const HeaderContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  padding: 20px 20px;
  background-color: ${(props) => props.theme.colors.white};
`;

export const Input = styled.TextInput`
  width: 100%;
  border-radius: 4px;
  padding: 4px 12px;
  background-color: ${(props) => props.theme.colors.secondary};
`;

export const SubmitButton = styled.Pressable`
  width: 100%;
  align-items: center;
  margin-top: 20px;
  border-radius: 6px;
  padding: 8px;
  background-color: ${(props) => props.theme.colors.primary};
`;

export const SubmitText = styled.Text`
  font-weight: 500;
  color: ${(props) => props.theme.colors.white};
`;
