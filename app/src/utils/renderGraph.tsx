import { scaleLinear, scaleUtc, extent, line, ticks, CurveFactory } from "d3";
import {
  Canvas,
  Group,
  Path,
  Skia,
  SkPath,
  useComputedValue,
  runTiming,
  useTiming,
  useValue,
} from "@shopify/react-native-skia";

import { DataPoint } from "@components/Chart";
import { useEffect, useState } from "react";

interface IGraphProps {
  path: SkPath;
  width: number;
  height: number;
  animationDuration: number;
}

interface GraphData {
  path: SkPath;
  yAxis: number[];
  xAxis: number[];
}

interface IMakeGraphProps {
  data: DataPoint[];
  curve: CurveFactory;
  width: number;
  height: number;
  margin: number;
}

export function Graph({ path, width, height, animationDuration }: IGraphProps) {
  const timer = useTiming({ from: 0, to: 1 }, { duration: animationDuration });
  const progress = useComputedValue(() => {
    return timer.current;
  }, [timer]);

  return (
    <Canvas
      style={{
        width,
        height,
      }}
    >
      <Group>
        <Path
          style="stroke"
          path={path}
          strokeWidth={4}
          color="#4E9DEC"
          end={progress}
        />
      </Group>
    </Canvas>
  );
}

export function makeGraph({
  data,
  curve,
  width,
  height,
  margin,
}: IMakeGraphProps): GraphData {
  console.log(data);
  
  const [minValue, maxValue] = extent(data, (data) => data.value);
  const [minDate, maxDate] = extent(data, (data) => data.time);

  const yScale = scaleLinear()
    .domain([minValue, maxValue])
    .nice()
    .range([height - margin, margin]);

  const xScale = scaleUtc()
    .domain([minDate, maxDate])
    .range([margin, width - margin]);

  const yAxis = ticks(minValue, maxValue, 4);
  const xAxis = ticks(minDate, maxDate, 6);

  const curvedLine = line<DataPoint>()
    .curve(curve)
    .x((d) => xScale(d.time))
    .y((d) => yScale(d.value));

  const skPath = Skia.Path.MakeFromSVGString(curvedLine(data));

  return {
    path: skPath,
    yAxis,
    xAxis,
  };
}
