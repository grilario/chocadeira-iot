import { Pressable, ScrollView } from "react-native";
import { useTheme } from "styled-components/native";
import { ArrowLeft } from "phosphor-react-native";

import { Container, HeaderContainer, Input, Label, SubmitButton, SubmitText, Title } from "./styles";

export default function WiFi({ navigation }) {
  const { colors } = useTheme();

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
        <Input cursorColor={colors.text} style={{ elevation: 0.8 }} />
        <Label>Senha</Label>
        <Input cursorColor={colors.text} style={{ elevation: 0.8 }} secureTextEntry={true} />
        <SubmitButton style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}>
          <SubmitText>Salvar</SubmitText>
        </SubmitButton>
      </Container>
    </ScrollView>
  );
}
