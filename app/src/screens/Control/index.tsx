import { ScrollView } from "react-native";

import TimerControl from "@components/TimerControl";
import TimeList from "@components/TimeList";

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
          <Title>Ventoinha</Title>
          <TimerControl />
        </Section>

        <Section>
          <Title>Viragem dos Ovos</Title>
          <TimeList />
        </Section>
      </Container>
    </ScrollView>
  );
}
