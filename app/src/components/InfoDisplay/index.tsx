import { ThermometerSimple, Drop, Lightbulb } from "phosphor-react-native";
import { useTheme } from "styled-components";

import { Container, Title, Text } from "./styles";

interface InfoDisplayProps {
  icon: "thermometer" | "humidity" | "light";
  value: string;
}

export default function InfoDisplay({ icon, value }: InfoDisplayProps) {
  const theme = useTheme();

  return (
    <Container
      style={{
        shadowColor: "#0000008f",
        elevation: 0.6,
      }}
    >
      {icon === "thermometer" && (
        <>
          <ThermometerSimple color={theme.colors.primary} size={36} />
          <Title>Temperatura</Title>
          <Text>{value}</Text>
        </>
      )}
      {icon === "humidity" && (
        <>
          <Drop color={theme.colors.primary} size={36} />
          <Title>Umidade</Title>
          <Text>{value}</Text>
        </>
      )}
      {icon === "light" && (
        <>
          <Lightbulb color={theme.colors.primary} size={36} />
          <Title>Lâmpada</Title>
          <Text>{value}</Text>
        </>
      )}
    </Container>
  );
}
