import { useState } from "react";
import { useTheme } from "styled-components/native";
import { Plus, Minus } from "phosphor-react-native";

import {
  Button,
  Container,
  Input,
  InputContainer,
  InputGroup,
  Legend,
  Submit,
  SubmitContainer,
  SubmitText,
} from "./styles";

interface TimerControlProps {
  powerOn?: (number) => void;
  powerOff?: (number) => void;
}

export default function TimerControl({ powerOn, powerOff }: TimerControlProps) {
  const { colors } = useTheme();

  const [minutes, setMinutes] = useState("10");

  return (
    <Container>
      <InputContainer style={{ elevation: 1.8 }}>
        <Button
          style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
          onPress={() => {
            setMinutes((prev) => (Number(prev) - 1).toString());
          }}
        >
          <Minus size={14} color={colors.white} weight="bold" />
        </Button>
        <InputGroup>
          <Input
            maxLength={4}
            keyboardType="numeric"
            contextMenuHidden
            cursorColor={colors.textSecondary}
            value={minutes}
            onChangeText={(text) => {
              if (Number(text) || text === "") {
                setMinutes(text);
              }
            }}
          />
          <Legend>minutos</Legend>
        </InputGroup>
        <Button
          style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
          onPress={() => {
            setMinutes((prev) => (Number(prev) + 1).toString());
          }}
        >
          <Plus size={14} color={colors.white} weight="bold" />
        </Button>
      </InputContainer>
      <SubmitContainer>
        <Submit
          style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
          onPress={() => {
            powerOff && powerOff(Math.abs(Number(minutes)));
          }}
        >
          <SubmitText>Desligar</SubmitText>
        </Submit>
        <Submit
          primary
          style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
          onPress={() => {
            powerOn && powerOn(Math.abs(Number(minutes)));
          }}
        >
          <SubmitText primary>Ligar</SubmitText>
        </Submit>
      </SubmitContainer>
    </Container>
  );
}
