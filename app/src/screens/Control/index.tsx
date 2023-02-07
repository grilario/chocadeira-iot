import { useState } from "react";
import { useTheme } from "styled-components/native";

import Slider from "@components/Slider";
import Switch from "@components/Switch";
import TimeList from "@components/TimeList";
import Title from "@components/Title";

import {
  Container,
  MasterContainerControl,
  SecondaryContainerControl,
} from "./styles";

export default function Control() {
  const { colors } = useTheme();

  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <Container showsVerticalScrollIndicator={false}>
      <MasterContainerControl>
        <Title>Chocadeira</Title>
        <Switch
          onToggle={() => setIsEnabled((state) => !state)}
          value={isEnabled}
        />
      </MasterContainerControl>
      <SecondaryContainerControl
        enable={isEnabled}
        pointerEvents={isEnabled ? "auto" : "none"}
      >
        <Slider title="Controle da Lâmpada" />
        <Slider title="Controle da Ventoinha" />
        <TimeList title="Viragem dos ovos" isEnabled={isEnabled} />
      </SecondaryContainerControl>
    </Container>
  );
}
