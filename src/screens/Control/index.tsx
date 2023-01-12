import { useState } from "react";
import { Switch } from "react-native";
import { useTheme } from "styled-components/native";

import Slider from "@components/Slider";
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
          trackColor={{ false: colors.textSecondary, true: colors.primary }}
          thumbColor="#ffffff"
          onValueChange={() => setIsEnabled((state) => !state)}
          value={isEnabled}
        />
      </MasterContainerControl>
      <SecondaryContainerControl
        enable={isEnabled}
        pointerEvents={isEnabled ? "auto" : "none"}
      >
        <Slider title="Controle da Lâmpada" />
        <Slider title="Controle da Ventoinha" />
        <TimeList title="Viragem dos ovos"/>
      </SecondaryContainerControl>
    </Container>
  );
}
