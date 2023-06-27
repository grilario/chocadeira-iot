import { useTheme } from "styled-components/native";
import { IconProps } from "phosphor-react-native";

import { Container, Icon, Slug, Title } from "./styles";

interface SensorDisplayProps {
  icon: ({}: IconProps) => JSX.Element;
  name: string;
  value: string;
}

export default function SensorDisplay({ icon, name, value }: SensorDisplayProps) {
  const { colors } = useTheme();

  const rendered = icon({ size: 30, color: colors.primary });

  return (
    <Container style={{ elevation: 2 }}>
      <Icon>
        {rendered}
        <Slug>{name}</Slug>
      </Icon>
      <Title>{value}</Title>
    </Container>
  );
}
