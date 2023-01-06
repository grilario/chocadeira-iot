import InfoDisplay from "@components/InfoDisplay";

import { Container, InfoStatus } from "./styles";

export default function Monitoring() {
  return (
    <Container>
      <InfoStatus>
        <InfoDisplay icon="thermometer" value="35°C"/>
        <InfoDisplay icon="humidity" value="75%"/>
        <InfoDisplay icon="light" value="Ligada" />
      </InfoStatus>
    </Container>
  );
}
