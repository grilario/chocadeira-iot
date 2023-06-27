import { ScrollView } from "react-native";

import TimerControl from "@components/TimerControl";

import { Container, Section, Title } from "./styles";

export default function Control() {
  return (
    <ScrollView>
      <Container>
        <Section>
          <Title>Lâmpada</Title>
          <TimerControl />
        </Section>

        <Section>
          <Title>Fan</Title>
          <TimerControl />
        </Section>
      </Container>
    </ScrollView>
  );
}
