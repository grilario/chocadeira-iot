import { ScrollView, View } from "react-native";
import { Svg, Path, Rect, Text, G, Defs, LinearGradient, Stop } from "react-native-svg";
import format from "date-fns/format";

import { useTheme } from "styled-components/native";

interface GraphProps {
  data: {
    path: string;
    xTicks: { value: Date; position: number }[];
    yTicks: { value: number; position: number }[];
  };
  width: number;
  widthMultiplier: number;
  height: number;
}

export default function Graph({ data, width, widthMultiplier, height }: GraphProps) {
  const { colors } = useTheme();

  return (
    <View>
      <Svg style={{ position: "absolute", zIndex: 10 }} width="26" height="100%">
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0.6" stopColor={colors.white} stopOpacity="1" />
            <Stop offset="1" stopOpacity="0" />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#grad)" />
        {data.yTicks.map(({ position, value }) => (
          <Text key={value} fill="black" y={position} x={0} fontSize={12} textAnchor="start">
            {value}
          </Text>
        ))}
      </Svg>

      <Svg style={{ position: "absolute", zIndex: 10, right: 0 }} width="26" height="100%">
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0.4" stopOpacity="0" />
            <Stop offset="1" stopColor={colors.white} stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Rect x="100%" width="-26" height="100%" fill="url(#grad)" />
      </Svg>

      <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ width, aspectRatio: 16 / 9 }}>
        <View style={{ width: width * widthMultiplier, height: "100%" }}>
          <Svg height="100%" width="100%">
            <Path d={data.path} stroke={colors.primary} strokeWidth={3.2} />

            {data.xTicks.map(({ position, value }) => (
              <G key={value.getTime()} y={height - 26}>
                <Text fill="black" x={position} y={0} fontSize={12} textAnchor="middle">
                  {format(value, "HH:mm")}
                </Text>
                <Text fill="black" x={position} y={12} fontSize={12} textAnchor="middle">
                  {format(value, "MM/dd")}
                </Text>
              </G>
            ))}
          </Svg>
        </View>
      </ScrollView>
    </View>
  );
}
