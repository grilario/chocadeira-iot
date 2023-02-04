import SliderNative from "@react-native-community/slider";
import { useTheme } from "styled-components";

import Text from "@components/Text";
import Title from "@components/Title";

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
}

export default function Slider({ title }: ISliderProps) {
  const { colors, fonts } = useTheme();

  return (
    <Container>
      <Title>{title}</Title>
      <SliderContainer>
        <SliderNative
          maximumTrackTintColor={colors.textSecondary}
          minimumTrackTintColor={colors.primary}
          thumbTintColor={colors.primary}
        />
        <LegendContainer>
          <Legend>1min</Legend>
          <Legend>2,5min</Legend>
          <Legend>5min</Legend>
        </LegendContainer>
      </SliderContainer>
      <SubmitContainer>
        <SecondaryButton
          style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
        >
          <Text style={{ fontFamily: fonts.openSansBold }}>Desligar</Text>
        </SecondaryButton>
        <PrimaryButton
          style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
        >
          <Text style={{ fontFamily: fonts.openSansBold, color: "#ffffff" }}>
            Ligar
          </Text>
        </PrimaryButton>
      </SubmitContainer>
    </Container>
  );
}
