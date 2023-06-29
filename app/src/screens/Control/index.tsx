import { ScrollView } from "react-native";

import TimerControl from "@components/TimerControl";
import TimeList from "@components/TimeList";

import { sendCommand } from "@services/firebase";

import { Container, Section, Title } from "./styles";

export default function Control() {
  const powerOnLight = (minutes: number) => {
    sendCommand("light", { time: minutes * 60_000, value: true }, "Ligou lâmpada");
  };

  const powerOffLight = (minutes: number) => {
    sendCommand("light", { time: minutes * 60_000, value: false }, "Desligou lâmpada");
  };

  const powerOnFan = (minutes: number) => {
    sendCommand("fan", { time: minutes * 60_000, value: true }, "Ligou ventoinha");
  };

  const powerOffFan = (minutes: number) => {
    sendCommand("fan", { time: minutes * 60_000, value: false }, "Desligou ventoinha");
  };

  return (
    <ScrollView>
      <Container>
        <Section>
          <Title>Lâmpada</Title>
          <TimerControl powerOn={powerOnLight} powerOff={powerOffLight} />
        </Section>

        <Section>
          <Title>Ventoinha</Title>
          <TimerControl powerOn={powerOnFan} powerOff={powerOffFan} />
        </Section>

        <Section>
          <Title>Viragem dos Ovos</Title>
          <TimeList />
        </Section>
      </Container>
    </ScrollView>
  );
}
