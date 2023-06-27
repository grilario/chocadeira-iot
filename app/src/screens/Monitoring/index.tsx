import { ScrollView } from "react-native";
import { Thermometer, Drop } from "phosphor-react-native";

import SensorDisplay from "@components/SensorDisplay";

import { Container, SensorContainer } from "./styles";

export default function Monitoring() {
  return (
    <ScrollView>
      <Container>
        <SensorContainer>
          <SensorDisplay icon={Thermometer} name="Temperatura" value="12C°" />
          <SensorDisplay icon={Drop} name="Umidade" value="12%" />
        </SensorContainer>
      </Container>
    </ScrollView>
  );
}
