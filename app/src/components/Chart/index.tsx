import type { CurveFactory } from "d3";
import { useState } from "react";
import { View, LayoutRectangle } from "react-native";

import { Graph, makeGraph } from "@utils/renderGraph";

import { Button, Container, Legend, Tab, Title, Text } from "./styles";

export interface DataPoint {
  time: number;
  value: number;
}

interface ChartProps {
  title: string;
  animationDuration: number;
  symbolLegend?: string;
  curve: CurveFactory;
  getTodayData: () => DataPoint[];
  getThreeDaysData: () => DataPoint[];
  getWeekData: () => DataPoint[];
}

enum Tabs {
  OneDay = "getTodayData",
  ThreeDays = "getThreeDaysData",
  Week = "getWeekData",
}

export default function Chart({ title, ...props }: ChartProps) {
  const [layout, setLayout] = useState<LayoutRectangle>({} as LayoutRectangle);
  const [activeTab, setActiveTab] = useState(Tabs.OneDay);

  const dataFunction = props[activeTab];
  const data = dataFunction();

  const { path, xAxis, yAxis } = makeGraph({
    data,
    curve: props.curve,
    width: layout.width,
    height: layout.height,
    margin: 10,
  });

  return (
    <Container>
      <Title>{title}</Title>
      <Tab>
        <Button
          active={activeTab === Tabs.OneDay}
          onPress={() => setActiveTab(Tabs.OneDay)}
        >
          <Text active={activeTab === Tabs.OneDay}>1D</Text>
        </Button>
        <Button
          active={activeTab === Tabs.ThreeDays}
          onPress={() => setActiveTab(Tabs.ThreeDays)}
        >
          <Text active={activeTab === Tabs.ThreeDays}>3D</Text>
        </Button>
        <Button
          active={activeTab === Tabs.Week}
          onPress={() => setActiveTab(Tabs.Week)}
        >
          <Text active={activeTab === Tabs.Week}>1W</Text>
        </Button>
      </Tab>
      <GraphBase
        xAxis={xAxis}
        yAxis={yAxis}
        setLayout={setLayout}
        symbolLegend={props.symbolLegend}
      >
        <Graph
          width={layout.width}
          height={layout.height}
          path={path}
          animationDuration={props.animationDuration}
        />
      </GraphBase>
    </Container>
  );
}

function GraphBase({ yAxis, xAxis, setLayout, symbolLegend, children }) {
  const isOnOffGraph = yAxis[0] === 0 && yAxis[yAxis.length - 1] === 1; // This check if yAxis first element is 0 and last element is 1

  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <View
          style={[
            { width: "12%", height: 145 },
            isOnOffGraph
              ? { justifyContent: "space-between" }
              : { justifyContent: "space-evenly" },
          ]}
        >
          {isOnOffGraph ? (
            <>
              <Legend>ON</Legend>
              <Legend>OFF</Legend>
            </>
          ) : (
            yAxis.reverse().map((text, i) => (
              <Legend key={i}>
                {text}
                {symbolLegend}
              </Legend>
            ))
          )}
        </View>
        <View
          style={{ width: "88%", height: 140 }}
          onLayout={(event) => setLayout(event.nativeEvent.layout)}
        >
          {children}
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          width: "88%",
          alignSelf: "flex-end",
          justifyContent: "space-around",
        }}
      >
        {xAxis.map((value, i) => (
          <Legend key={i}>{new Date(value).getHours()}h</Legend>
        ))}
      </View>
    </View>
  );
}
