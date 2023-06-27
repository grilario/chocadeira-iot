import { Pressable, ScrollView } from "react-native";
import { useTheme } from "styled-components/native";
import { ArrowLeft } from "phosphor-react-native";

import { Container, HeaderContainer, Input, Label, SubmitButton, SubmitText, Title } from "./styles";

export default function Assistant({ navigation }) {
  const { colors } = useTheme();

  return (
    <ScrollView>
      <HeaderContainer style={{ elevation: 1.8 }}>
        <Pressable onPress={() => navigation.pop()}>
          <ArrowLeft size={22} color={colors.text} weight="bold" />
        </Pressable>
        <Title>Assistente</Title>
      </HeaderContainer>
      <Container>
        <Label>Nome da assistente</Label>
        <Input cursorColor={colors.text} style={{ elevation: 0.8 }} />
        <SubmitButton style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}>
          <SubmitText>Salvar</SubmitText>
        </SubmitButton>
      </Container>
    </ScrollView>
  );
}
