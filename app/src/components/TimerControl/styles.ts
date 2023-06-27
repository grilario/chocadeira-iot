import styled from "styled-components/native";

export const Container = styled.View`
  margin-top: 20px;
  flex: 1;
`;

export const InputContainer = styled.View`
  justify-content: space-between;
  padding: 12px 18px;
  flex-direction: row;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 6px;
`;

export const InputGroup = styled.View`
  align-items: center;
  flex-direction: row;
`;

export const Input = styled.TextInput`
  padding-right: 4px;
  text-align: right;
`;

export const Legend = styled.Text``;

export const Button = styled.Pressable`
  width: 28px;
  height: 28px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.primary};
  opacity: 0.3;
  border-radius: 999px;
`;

export const SubmitContainer = styled.View`
  margin-top: 26px;
  flex-direction: row;
  gap: 220px;
`;

export const Submit = styled.Pressable<{ primary?: boolean }>`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 6px;
  background-color: ${(props) => (props.primary ? props.theme.colors.primary : props.theme.colors.white)};
  border: ${(props) => (props.primary ? "1px #00000000" : `1px ${props.theme.colors.text}`)};
  border-radius: 6px;
`;

export const SubmitText = styled.Text<{ primary?: boolean }>`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => (props.primary ? props.theme.colors.white : props.theme.colors.text)};
`;
