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
    return simpleDataOnOff;
  }

  function getThreeDaysDate() {
    return simpleDataOnOff;
  }

  function getWeekDate() {
    return simpleDataOnOff;
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
    return simpleDataOnOff;
  }

  function getThreeDaysDate() {
    return simpleDataOnOff;
  }

  function getWeekDate() {
    return simpleDataOnOff;
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
    return simpleData;
  }

  function getThreeDaysDate() {
    return simpleData;
  }

  function getWeekDate() {
    return simpleData;
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
    return simpleData;
  }

  function getThreeDaysDate() {
    return simpleData;
  }

  function getWeekDate() {
    return simpleData;
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

const simpleDataOnOff = [
  {
    date: 1673405063000,
    value: 0,
  },
  {
    date: 1673356253000,
    value: 0,
  },
  {
    date: 1673368129000,
    value: 1,
  },
  {
    date: 1673356034000,
    value: 1,
  },
  {
    date: 1673362575000,
    value: 0,
  },
  {
    date: 1673360431000,
    value: 1,
  },
  {
    date: 1673339469000,
    value: 0,
  },
  {
    date: 1673334519000,
    value: 1,
  },
].sort((a, b) => a.date - b.date);

const simpleData = [
  {
    date: 1673405063000,
    value: 34,
  },
  {
    date: 1673356253000,
    value: 55,
  },
  {
    date: 1673368129000,
    value: 28,
  },
  {
    date: 1673356034000,
    value: 43,
  },
  {
    date: 1673362575000,
    value: 52,
  },
  {
    date: 1673360431000,
    value: 33,
  },
  {
    date: 1673339469000,
    value: 39,
  },
  {
    date: 1673334519000,
    value: 41,
  },
].sort((a, b) => a.date - b.date);
