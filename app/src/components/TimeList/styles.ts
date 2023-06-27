import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  margin: 20px 0 30px;
`;

export const Item = styled.View`
  width: 100%;
  margin: 4px 0;
  padding: 12px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 8px;
`;

export const Button = styled.Pressable``;

export const Text = styled.Text`
  color: #000;
  font-size: 18px;
`;

export const Divider = styled.View`
  height: 20px;
`;
