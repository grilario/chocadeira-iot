import { useState } from "react";
import { Pressable, ScrollView } from "react-native";
import { useTheme } from "styled-components/native";
import { ArrowLeft } from "phosphor-react-native";

import { Container, HeaderContainer, Input, Label, SubmitButton, SubmitText, Title } from "./styles";

export default function WiFi({ navigation }) {
  const { colors } = useTheme();

  const [ssid, setSSID] = useState("");
  const [password, setPassword] = useState("");

  const changePassword = async () => {
    fetch("http://192.168.4.1", { method: "POST", body: JSON.stringify({ ssid, password }) });
  };

  return (
    <ScrollView>
      <HeaderContainer style={{ elevation: 1.8 }}>
        <Pressable onPress={() => navigation.pop()}>
          <ArrowLeft size={22} color={colors.text} weight="bold" />
        </Pressable>
        <Title>Rede WiFi da Chocadeira</Title>
      </HeaderContainer>
      <Container>
        <Label>Nome</Label>
        <Input
          cursorColor={colors.text}
          style={{ elevation: 0.8 }}
          value={ssid}
          onChangeText={(text) => setSSID(text)}
        />
        <Label>Senha</Label>
        <Input
          cursorColor={colors.text}
          style={{ elevation: 0.8 }}
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <SubmitButton onPress={changePassword} style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}>
          <SubmitText>Salvar</SubmitText>
        </SubmitButton>
      </Container>
    </ScrollView>
  );
}
