import { ScrollView } from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import Voice, { SpeechResultsEvent, SpeechErrorEvent } from "@react-native-voice/voice";
import { WarningCircle, CheckCircle } from "phosphor-react-native";
import * as speech from "expo-speech";
import wordsToNumbers from "words-to-numbers";

import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import { Container, MessageContainer, MessageText, ResultContainer, ResultMessage, Section, Title } from "./styles";
import { sendCommand } from "@services/firebase";

type Results = { type: "success" | "error"; message: string }[];

export default function Speech({ navigation }: BottomTabScreenProps<{}>) {
  const scrollRef = useRef<ScrollView>(null);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [results, setResults] = useState<Results>([]);
  const [message, setMessage] = useState("");

  const onResults = useCallback((event: SpeechResultsEvent) => {
    if (!event.value) return;

    setMessage(event.value[0]);

    let type: "powerOn" | "powerOff";
    const typeOptions = {
      powerOn: ["ligar", "ligue", "acenda", "acender", "gire", "girar", "rodar", "rode"],
      powerOff: ["desligar", "desligue", "apagar", "apague", "pare", "parar"],
    };

    let sensor: "light" | "fan";
    let foundWord = "";
    const sensorOptions = {
      light: ["lâmpada", "luz", "iluminação"],
      fan: ["ventoinha", "ventilador", "cata-vento", "catavento"],
    };

    let timeInMilliseconds = 10_000;
    let timeString = "";
    const timeOptions = [
      ["segundos", 1_000],
      ["segundo", 1_000],
      ["minuto", 60_000],
      ["minutos", 60_000],
      ["hora", 3_600_000],
      ["horas", 3_600_000],
    ];

    for (const message of event.value.reverse()) {
      for (const [index, word] of message.split(" ").entries()) {
        typeOptions.powerOn.includes(word.toLowerCase()) && (type = "powerOn");
        typeOptions.powerOff.includes(word.toLowerCase()) && (type = "powerOff");

        sensorOptions.light.forEach((option) => {
          if (option !== word.toLowerCase()) return;

          sensor = "light";
          foundWord = option;
        });

        sensorOptions.fan.forEach((option) => {
          if (option !== word.toLowerCase()) return;

          sensor = "fan";
          foundWord = option;
        });

        timeOptions.forEach((option) => {
          if (option[0] !== word.toLowerCase()) return;

          const time = wordsToNumbers(message.split(" ")[index - 1]);
          timeInMilliseconds = Number(time) * (option[1] as number);
          timeString = ` por ${time} ${option[0]}`;
        });
      }
    }

    if (!type || !sensor) {
      const message = "Comando não reconhecido";

      setResults((results) => [...results, { type: "error", message }]);
      speech.speak(message, { language: "pt-BR" });

      return;
    }

    const messages = {
      powerOn: `Ligando ${foundWord}${timeString}...`,
      powerOff: `Desligando ${foundWord}${timeString}...`,
    };

    const message = messages[type];

    setResults((results) => [...results, { type: "success", message }]);
    speech.speak(message, { language: "pt-BR" });

    const names = {
      light: {
        powerOn: `Ligou lâmpada`,
        powerOff: `Desligou lâmpada`,
      },
      fan: {
        powerOn: `Ligou ventoinha`,
        powerOff: `Desligou ventoinha`,
      },
    };

    sendCommand(sensor, { time: timeInMilliseconds, value: type === "powerOn" }, names[sensor][type]).catch(() => {});
  }, []);

  const onError = useCallback((event: SpeechErrorEvent) => {}, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", () => {
      Voice.start("pt-BR");
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    Voice.onSpeechResults = onResults;
    Voice.onSpeechError = onError;
    Voice.onSpeechPartialResults = (e) => setMessage(e.value[0]);
    Voice.onSpeechStart = () => {
      setMessage("");
      setIsRecognizing(true);
    };
    Voice.onSpeechEnd = () => {
      setTimeout(() => setIsRecognizing(false), 1200);
    };

    speech.speak("Olá sou a assistente da Chocadeira aiiotii, como posso ajudar?", { language: "pt-BR" });

    setTimeout(() => {
      Voice.start("pt-BR");
    }, 5_000);

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return (
    <>
      <ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        onContentSizeChange={(e) => scrollRef.current.scrollToEnd({ animated: true })}
      >
        <Container>
          <Title>Assistente</Title>
          <Section>
            {results.map(({ type, message }, index) => (
              <ResultContainer key={index} style={{ elevation: 1.8 }}>
                {type === "error" && <WarningCircle size={28} color="#ef233c" />}
                {type === "success" && <CheckCircle size={28} color="#29bf12" />}
                <ResultMessage>{message}</ResultMessage>
              </ResultContainer>
            ))}
          </Section>
        </Container>
      </ScrollView>
      {isRecognizing && (
        <MessageContainer style={{ elevation: 12 }}>
          <MessageText>
            {message.replace(/^\w/, function ($0) {
              return $0.toUpperCase();
            })}
          </MessageText>
        </MessageContainer>
      )}
    </>
  );
}
