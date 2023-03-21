import { curveBasis, curveStepAfter } from "d3";

import Chart from "@components/Chart";
import { generateList, simplifyList } from "@utils/data";

import ThermometerDisplay from "./Components/ThermometerDisplay";
import HumidityDisplay from "./Components/HumidityDisplay";
import LightDisplay from "./Components/LightDisplay";

import { Container, InfoStatus, Title, Divider } from "./styles";
import { useCallback, useEffect, useState } from "react";
import {
  endAt,
  get,
  limitToLast,
  orderByChild,
  query,
  ref,
  startAt,
} from "firebase/database";
import { database } from "@utils/firebase";
import subHours from "date-fns/subHours";

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
  const [temperaturesToday, setTemperaturesToday] = useState([]);
  const [temperaturesThreeDays, setTemperaturesThreeDays] = useState([]);
  const [temperaturesWeek, setTemperaturesWeek] = useState([]);

  const getTodayDate = useCallback(() => temperaturesToday, [temperaturesToday])
  const getThreeDaysDate = useCallback(() => temperaturesThreeDays, [temperaturesThreeDays])
  const getWeekDate = useCallback(() => temperaturesWeek, [temperaturesWeek])

  useEffect(() => {
    const todayQuery = query(
      ref(database, "operation/temperature"),
      orderByChild("time"),
      startAt(subHours(new Date(), 24).getTime(), "time")
    );
    const threeDaysQuery = query(
      ref(database, "operation/temperature"),
      orderByChild("time"),
      startAt(subHours(new Date(), 24 * 3).getTime(), "time")
    );
    const weekQuery = query(
      ref(database, "operation/temperature"),
      orderByChild("time"),
      startAt(subHours(new Date(), 24 * 7).getTime(), "time")
    );

    (async () => {
      const temperaturesToday = await get(todayQuery);
      const temperaturesThreeDays = await get(threeDaysQuery);
      const temperaturesWeek = await get(weekQuery);

      setTemperaturesToday(Object.values(temperaturesToday.val()));
      setTemperaturesThreeDays(Object.values(temperaturesThreeDays.val()));
      setTemperaturesWeek(Object.values(temperaturesWeek.val()));
    })();
  }, []);

  if (!temperaturesToday.length) return
  
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
