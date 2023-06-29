import * as d3 from "d3";

type Data = { time: number; value: number };

interface MakePathProps {
  width: number;
  height: number;
  margin: { top: number; bottom: number; left: number; right: number };
  data: Data[];
}

export async function makePath({ width, height, margin, data }: MakePathProps) {
  const [minDate, maxDate] = d3.extent(data, (data) => data.time);
  const [minValue, maxValue] = d3.extent(data, (data) => data.value);

  const x = d3.scaleUtc([minDate, maxDate], [margin.left, width - margin.right]);
  const y = d3.scaleLinear([minValue, maxValue], [height - margin.bottom, margin.top]).nice();

  const line = d3
    .line<Data>()
    .curve(d3.curveBasis)
    .x((d) => x(d.time))
    .y((d) => y(d.value));

  const path = line(data);

  return {
    path,
    xTicks: x.ticks(width / 150).map((value) => ({ value, position: x(value) })),
    yTicks: y.ticks(5).map((value) => ({ value, position: y(value) })),
  };
}
