import { useEffect, useState } from "react";
import { Dimensions, ScrollView } from "react-native";
import { Thermometer, Drop } from "phosphor-react-native";
import { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import Graph from "@screens/Monitoring/Graph";
import SensorDisplay from "@components/SensorDisplay";

import { makePath } from "@services/graph";

import {
  Container,
  GraphContainer,
  NavigationContainer,
  Navigator,
  NavigatorIndicator,
  NavigatorLegend,
  Section,
  SensorContainer,
  Title,
} from "./styles";

export default function Monitoring() {
  return (
    <ScrollView>
      <Container>
        <SensorContainer>
          <SensorDisplay icon={Thermometer} name="Temperatura" value="12C°" />
          <SensorDisplay icon={Drop} name="Umidade" value="12%" />
        </SensorContainer>
        <Section>
          <Title>Temperatura</Title>
          <TemperatureGraph />
        </Section>
        <Section>
          <Title>Umidade</Title>
          <HumidityGraph />
        </Section>
      </Container>
    </ScrollView>
  );
}

const data = [
  { time: Date.now(), value: 25 },
  { time: Date.now() + 10_0000, value: 26 },
  { time: Date.now() + 20_0000, value: 5 },
  { time: Date.now() + 30_0000, value: 28 },
  { time: Date.now() + 40_0000, value: 25 },
  { time: Date.now() + 50_0000, value: 54 },
  { time: Date.now() + 70_0000, value: 28 },
  { time: Date.now() + 80_0000, value: 25 },
  { time: Date.now() + 90_0000, value: 26.4 },
  { time: Date.now() + 100_0000, value: 24.2 },
  { time: Date.now() + 110_0000, value: 28 },
  { time: Date.now() + 120_0000, value: 35 },
  { time: Date.now() + 130_0000, value: 23 },
];

function TemperatureGraph() {
  const [tab, setTab] = useState<"1D" | "7D" | "21D">("1D");
  const leftOffset = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      left: `${leftOffset.value}%`,
    };
  });

  const width = Dimensions.get("window").width - 80;
  const height = (width * 9) / 16;

  const [graphs, setGraphs] = useState([]);

  const makeGraphs = async () => {
    const oneDay = await makePath({
      width,
      height,
      margin: { top: 0, bottom: 28, left: 0, right: 0 },
      data,
    });

    const sevenDays = await makePath({
      width: width * 2,
      height,
      margin: { top: 0, bottom: 28, left: 0, right: 0 },
      data,
    });

    const twentyOneDays = await makePath({
      width: width * 3,
      height,
      margin: { top: 0, bottom: 28, left: 0, right: 0 },
      data,
    });

    setGraphs([oneDay, sevenDays, twentyOneDays]);
  };

  useEffect(() => {
    makeGraphs();
  }, []);

  return (
    <GraphContainer style={{ elevation: 1.8 }}>
      <NavigationContainer>
        <NavigatorIndicator style={[animatedStyle]} />
        <Navigator
          onPress={() => {
            leftOffset.value = withTiming(0);
            setTab("1D");
          }}
        >
          <NavigatorLegend selected={tab === "1D"}>1D</NavigatorLegend>
        </Navigator>
        <Navigator
          onPress={() => {
            leftOffset.value = withTiming(33.333);
            setTab("7D");
          }}
        >
          <NavigatorLegend selected={tab === "7D"}>7D</NavigatorLegend>
        </Navigator>
        <Navigator
          onPress={() => {
            leftOffset.value = withTiming(66.666);
            setTab("21D");
          }}
        >
          <NavigatorLegend selected={tab === "21D"}>21D</NavigatorLegend>
        </Navigator>
      </NavigationContainer>
      {graphs.length > 0 && (
        <>
          {tab === "1D" && <Graph width={width} height={height} widthMultiplier={1} data={graphs[0]} />}
          {tab === "7D" && <Graph width={width} height={height} widthMultiplier={2} data={graphs[1]} />}
          {tab === "21D" && <Graph width={width} height={height} widthMultiplier={3} data={graphs[2]} />}
        </>
      )}
    </GraphContainer>
  );
}

function HumidityGraph() {
  const [tab, setTab] = useState<"1D" | "7D" | "21D">("1D");
  const leftOffset = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      left: `${leftOffset.value}%`,
    };
  });

  const width = Dimensions.get("window").width - 80;
  const height = (width * 9) / 16;

  const [graphs, setGraphs] = useState([]);

  const makeGraphs = async () => {
    const oneDay = await makePath({
      width,
      height,
      margin: { top: 0, bottom: 28, left: 0, right: 0 },
      data,
    });

    const sevenDays = await makePath({
      width: width * 2,
      height,
      margin: { top: 0, bottom: 28, left: 0, right: 0 },
      data,
    });

    const twentyOneDays = await makePath({
      width: width * 3,
      height,
      margin: { top: 0, bottom: 28, left: 0, right: 0 },
      data,
    });

    setGraphs([oneDay, sevenDays, twentyOneDays]);
  };

  useEffect(() => {
    makeGraphs();
  }, []);

  return (
    <GraphContainer style={{ elevation: 1.8 }}>
      <NavigationContainer>
        <NavigatorIndicator style={[animatedStyle]} />
        <Navigator
          onPress={() => {
            leftOffset.value = withTiming(0);
            setTab("1D");
          }}
        >
          <NavigatorLegend selected={tab === "1D"}>1D</NavigatorLegend>
        </Navigator>
        <Navigator
          onPress={() => {
            leftOffset.value = withTiming(33.333);
            setTab("7D");
          }}
        >
          <NavigatorLegend selected={tab === "7D"}>7D</NavigatorLegend>
        </Navigator>
        <Navigator
          onPress={() => {
            leftOffset.value = withTiming(66.666);
            setTab("21D");
          }}
        >
          <NavigatorLegend selected={tab === "21D"}>21D</NavigatorLegend>
        </Navigator>
      </NavigationContainer>
      {graphs.length > 0 && (
        <>
          {tab === "1D" && <Graph width={width} height={height} widthMultiplier={1} data={graphs[0]} />}
          {tab === "7D" && <Graph width={width} height={height} widthMultiplier={2} data={graphs[1]} />}
          {tab === "21D" && <Graph width={width} height={height} widthMultiplier={3} data={graphs[2]} />}
        </>
      )}
    </GraphContainer>
  );
}
