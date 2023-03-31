import { curveBasis, curveStepAfter } from "d3";

import Chart from "@components/Chart";
import useGraphData from "@hooks/useGraphData";

import ThermometerDisplay from "./Components/ThermometerDisplay";
import HumidityDisplay from "./Components/HumidityDisplay";
import LightDisplay from "./Components/LightDisplay";

import { Container, InfoStatus, Title, Divider } from "./styles";

export default function Monitoring() {
  return (
    <Container showsVerticalScrollIndicator={false}>
      <Divider />
      <InfoStatus>
        <ThermometerDisplay />
        <HumidityDisplay />
        <LightDisplay />
      </InfoStatus>
      <Title>Funcionamento</Title>
      <ChartLamp />
      <Divider />
      <ChartFan />
      <Title>Sensores</Title>
      <ChartTemperature />
      <Divider />
      <ChartHumidity />
      <Divider />
    </Container>
  );
}

function ChartLamp() {
  const [data, isLoading] = useGraphData("light");
  
  
  if (isLoading) return <></>;

  return (
    <Chart
      title="Lâmpada"
      data={data}
      animationDuration={2000}
      curve={curveStepAfter}
    />
  );
}

function ChartFan() {
  const [data, isLoading] = useGraphData("fan");

  if (isLoading) return <></>;

  return (
    <Chart
      title="Ventoinha"
      data={data}
      animationDuration={2000}
      curve={curveStepAfter}
    />
  );
}

function ChartTemperature() {
  const [data, isLoading] = useGraphData("temperature");

  if (isLoading) return <></>;

  return (
    <Chart
      title="Temperatura"
      data={data}
      animationDuration={2000}
      curve={curveBasis}
      symbolLegend="°C"
    />
  );
}

function ChartHumidity() {
  const [data, isLoading] = useGraphData("humidity");

  if (isLoading) return <></>;

  return (
    <Chart
      title="Umidade"
      data={data}
      animationDuration={2000}
      curve={curveBasis}
      symbolLegend="%"
    />
  );
}
