import { scaleLinear, scaleUtc, extent, line, ticks, CurveFactory } from "d3";
import {
  Canvas,
  Group,
  Path,
  Skia,
  SkPath,
  useComputedValue,
  useTiming,
} from "@shopify/react-native-skia";

import { DataPoint } from "@components/Chart";

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

  const svgPath = curvedLine(data)
  const skPath = Skia.Path.MakeFromSVGString(svgPath ? svgPath : "");

  return {
    path: skPath,
    yAxis: yAxis.length ? yAxis : [30, 45, 60, 75],
    xAxis: xAxis.length ? xAxis : [1680264914313, 1680268514313, 1680272114313],
  };
}
