import { ScrollView } from "react-native";
import { useTheme } from "styled-components/native";
import { ChalkboardTeacher, WifiHigh } from "phosphor-react-native";

import { Container, IconContainer, Label, Option, Section, Separator, Title } from "./styles";

export default function Home({ navigation }) {
  const { colors } = useTheme();

  return (
    <ScrollView>
      <Container>
        <Title>Configurações</Title>
        <Section style={{ elevation: 1.8 }}>
          <Option onPress={() => navigation.push("Assistant")}>
            <IconContainer>
              <ChalkboardTeacher size={18} color={colors.white} />
            </IconContainer>
            <Label>Assistente</Label>
          </Option>

          <Separator />

          <Option onPress={() => navigation.push("WiFi")}>
            <IconContainer>
              <WifiHigh size={18} color={colors.white} />
            </IconContainer>
            <Label>Rede WiFi da Chocadeira</Label>
          </Option>
        </Section>
      </Container>
    </ScrollView>
  );
}
