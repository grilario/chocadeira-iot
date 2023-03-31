import { useState } from "react";
import SliderNative from "@react-native-community/slider";
import { useTheme } from "styled-components";
import { push, ref, set } from "firebase/database";

import Text from "@components/Text";
import Title from "@components/Title";
import { database } from "@utils/firebase";

import {
  Container,
  Legend,
  LegendContainer,
  PrimaryButton,
  SecondaryButton,
  SliderContainer,
  SubmitContainer,
} from "./styles";

interface ISliderProps {
  title: string;
  command: string;
}

export default function Slider({ title, command }: ISliderProps) {
  const { colors, fonts } = useTheme();
  const [value, setValue] = useState(10);

  async function handleSubmitCommand(type: "on" | "off", value: number) {
    set(ref(database, `/operation/command/${command}`), {
      type,
      time: Math.round(value * 1000),
    }).catch(() => {});

    push(ref(database, "/history"), {
      title: command + ": " + type,
      time: Date.now(),
    }).catch(() => {});
  }

  return (
    <Container>
      <Title>{title}</Title>
      <SliderContainer>
        <SliderNative
          minimumValue={10}
          maximumValue={60}
          maximumTrackTintColor={colors.textSecondary}
          minimumTrackTintColor={colors.primary}
          thumbTintColor={colors.primary}
          value={value}
          onSlidingComplete={(value) => setValue(value)}
        />
        <LegendContainer>
          <Legend>10s</Legend>
          <Legend>30s</Legend>
          <Legend>1m</Legend>
        </LegendContainer>
      </SliderContainer>
      <SubmitContainer>
        <SecondaryButton
          style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
          onPress={() => handleSubmitCommand("off", value)}
        >
          <Text style={{ fontFamily: fonts.openSansBold }}>Desligar</Text>
        </SecondaryButton>
        <PrimaryButton
          style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
          onPress={() => handleSubmitCommand("on", value)}
        >
          <Text style={{ fontFamily: fonts.openSansBold, color: "#ffffff" }}>
            Ligar
          </Text>
        </PrimaryButton>
      </SubmitContainer>
    </Container>
  );
}
