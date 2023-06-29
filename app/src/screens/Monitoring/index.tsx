import { useEffect, useState } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { Thermometer, Drop } from "phosphor-react-native";
import { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import Graph from "@screens/Monitoring/Graph";
import SensorDisplay from "@components/SensorDisplay";

import { makePath } from "@services/graph";
import { graphData, realtimeSensor } from "@services/firebase";

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
  const [dataSensors, setDataSensors] = useState<{ temperature: number; humidity: number; movement: boolean }>({
    temperature: 0,
    humidity: 0,
    movement: false,
  });

  useEffect(() => {
    const { event, unmount } = realtimeSensor(5_000);

    event.on("change", (data) => {
      setDataSensors(data);
    });

    return unmount;
  }, []);

  return (
    <ScrollView>
      <Container>
        <SensorContainer>
          <SensorDisplay icon={Thermometer} name="Temperatura" value={`${dataSensors.temperature}°C`} />
          <SensorDisplay icon={Drop} name="Umidade" value={`${dataSensors.humidity}%`} />
        </SensorContainer>
        <Section>
          <Title>Temperatura</Title>
          <RenderGraph name="temperature" suffix="°C" />
        </Section>
        <Section>
          <Title>Umidade</Title>
          <RenderGraph name="humidity" suffix="%" />
        </Section>
      </Container>
    </ScrollView>
  );
}

function RenderGraph({ name, suffix }: { name: "temperature" | "humidity"; suffix: string }) {
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
    const dataArray = await graphData(name);

    const graphs = await Promise.all([
      makePath({
        width,
        height,
        margin: { top: 0, bottom: 28, left: 0, right: 0 },
        data: dataArray[0],
      }),
      makePath({
        width: width * 2,
        height,
        margin: { top: 0, bottom: 28, left: 0, right: 0 },
        data: dataArray[1],
      }),
      makePath({
        width: width * 3,
        height,
        margin: { top: 0, bottom: 28, left: 0, right: 0 },
        data: dataArray[2],
      }),
    ]);

    setGraphs(graphs);
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
      {graphs.length > 0 ? (
        <>
          {tab === "1D" && (
            <Graph width={width} height={height} formatSuffix={suffix} widthMultiplier={1} data={graphs[0]} />
          )}
          {tab === "7D" && (
            <Graph width={width} height={height} formatSuffix={suffix} widthMultiplier={2} data={graphs[1]} />
          )}
          {tab === "21D" && (
            <Graph width={width} height={height} formatSuffix={suffix} widthMultiplier={3} data={graphs[2]} />
          )}
        </>
      ) : (
        <View style={{ width, aspectRatio: 16 / 9 }}></View>
      )}
    </GraphContainer>
  );
}
