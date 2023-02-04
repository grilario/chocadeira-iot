import { useEffect, useState } from "react";
import { curveBasis, curveStepAfter } from "d3";
import {
  ref,
  query,
  orderByChild,
  onChildAdded,
  limitToLast,
} from "firebase/database";

import Chart from "@components/Chart";
import InfoDisplay from "@components/InfoDisplay";
import { database } from "@utils/firebase";
import { generateList, simplifyList } from "@utils/data";

import { Container, InfoStatus, Title, Divider } from "./styles";

export default function Monitoring() {
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [light, setLight] = useState("");

  useEffect(() => {
    const temperature = query(
      ref(database, "operation/temperature"),
      orderByChild("time"),
      limitToLast(1)
    );
    const humidity = query(
      ref(database, "operation/humidity"),
      orderByChild("time"),
      limitToLast(1)
    );
    const light = query(
      ref(database, "operation/light"),
      orderByChild("time"),
      limitToLast(1)
    );

    const eventTemperature = onChildAdded(temperature, (data) => {
      setTemperature(data.val().value);
    });
    const eventHumidity = onChildAdded(humidity, (data) => {
      setHumidity(data.val().value);
    });
    const eventLight = onChildAdded(light, (data) => {
      setLight(data.val().value);
    });

    return () => {
      eventTemperature();
      eventHumidity();
      eventLight();
    };
  }, []);

  return (
    <Container showsVerticalScrollIndicator={false}>
      <Divider />
      <InfoStatus>
        <InfoDisplay icon="thermometer" value={temperature + "°C"} />
        <InfoDisplay icon="humidity" value={humidity + "%"} />
        <InfoDisplay
          icon="light"
          value={light == "on" ? "Ligada" : "Desligada"}
        />
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
  function getTodayDate() {
    return simplifyList(generateList(288, 0, 1), 12);
  }

  function getThreeDaysDate() {
    return simplifyList(generateList(288 * 3, 0, 1), 8 * 3);
  }

  function getWeekDate() {
    return simplifyList(generateList(288 * 7, 0, 1), 6 * 7);
  }

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
  function getTodayDate() {
    return simplifyList(generateList(288, 0, 1), 12);
  }

  function getThreeDaysDate() {
    return simplifyList(generateList(288 * 3, 0, 1), 8 * 3);
  }

  function getWeekDate() {
    return simplifyList(generateList(288 * 7, 0, 1), 6 * 7);
  }

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
  function getTodayDate() {
    return simplifyList(generateList(288, 25, 42), 12);
  }

  function getThreeDaysDate() {
    return simplifyList(generateList(288 * 3, 25, 42), 12 * 3);
  }

  function getWeekDate() {
    return simplifyList(generateList(288 * 7, 25, 42), 12 * 7);
  }

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
  function getTodayDate() {
    return simplifyList(generateList(288, 55, 92), 12);
  }

  function getThreeDaysDate() {
    return simplifyList(generateList(288 * 3, 55, 92), 12 * 3);
  }

  function getWeekDate() {
    return simplifyList(generateList(288 * 7, 55, 92), 12 * 7);
  }

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
