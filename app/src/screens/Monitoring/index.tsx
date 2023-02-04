import { curveBasis, curveStepAfter } from "d3";

import Chart from "@components/Chart";
import { generateList, simplifyList } from "@utils/data";

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
  const todayData = simplifyList(generateList(288, 0, 1), 12);
  const daysData = simplifyList(generateList(288 * 3, 0, 1), 8 * 3);
  const weekData = simplifyList(generateList(288 * 7, 0, 1), 6 * 7);

  const getTodayDate = () => todayData;
  const getThreeDaysDate = () => daysData;
  const getWeekDate = () => weekData;

  return (
    <Chart
      title="Lâmpada"
      getTodayData={getTodayDate}
      getThreeDaysData={getThreeDaysDate}
      getWeekData={getWeekDate}
      animationDuration={2000}
      curve={curveStepAfter}
    />
  );
}

function ChartFan() {
  const todayData = simplifyList(generateList(288, 0, 1), 12);
  const daysData = simplifyList(generateList(288 * 3, 0, 1), 8 * 3);
  const weekData = simplifyList(generateList(288 * 7, 0, 1), 6 * 7);

  const getTodayDate = () => todayData;
  const getThreeDaysDate = () => daysData;
  const getWeekDate = () => weekData;

  return (
    <Chart
      title="Ventoinha"
      getTodayData={getTodayDate}
      getThreeDaysData={getThreeDaysDate}
      getWeekData={getWeekDate}
      animationDuration={2000}
      curve={curveStepAfter}
    />
  );
}

function ChartTemperature() {
  const todayData = simplifyList(generateList(288, 25, 42), 12);
  const daysData = simplifyList(generateList(288 * 3, 25, 42), 8 * 3);
  const weekData = simplifyList(generateList(288 * 7, 25, 42), 6 * 7);

  const getTodayDate = () => todayData;
  const getThreeDaysDate = () => daysData;
  const getWeekDate = () => weekData;

  return (
    <Chart
      title="Temperatura"
      getTodayData={getTodayDate}
      getThreeDaysData={getThreeDaysDate}
      getWeekData={getWeekDate}
      animationDuration={2000}
      curve={curveBasis}
      symbolLegend="°C"
    />
  );
}

function ChartHumidity() {
  const todayData = simplifyList(generateList(288, 55, 92), 12);
  const daysData = simplifyList(generateList(288 * 3, 55, 92), 8 * 3);
  const weekData = simplifyList(generateList(288 * 7, 55, 92), 6 * 7);

  const getTodayDate = () => todayData;
  const getThreeDaysDate = () => daysData;
  const getWeekDate = () => weekData;

  return (
    <Chart
      title="Umidade"
      getTodayData={getTodayDate}
      getThreeDaysData={getThreeDaysDate}
      getWeekData={getWeekDate}
      animationDuration={2000}
      curve={curveBasis}
      symbolLegend="%"
    />
  );
}
