import { ScrollView, View } from "react-native";
import { Svg, Path, Rect, Text, G, Defs, LinearGradient, Stop, PathProps } from "react-native-svg";

import format from "date-fns/format";
import ptBR from "date-fns/locale/pt-BR";

import { useTheme } from "styled-components/native";
import Animated, { useAnimatedProps, useSharedValue, withTiming } from "react-native-reanimated";
import { useEffect } from "react";

interface GraphProps {
  data: {
    path: string;
    xTicks: { value: Date; position: number }[];
    yTicks: { value: number; position: number }[];
  };
  width: number;
  widthMultiplier: number;
  height: number;
  formatSuffix: string;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function Graph({ data, width, widthMultiplier, height, formatSuffix }: GraphProps) {
  const { colors } = useTheme();

  const dash = width * 1.8 * widthMultiplier;
  const strokeDashoffset = useSharedValue(dash);
  const animatedProps = useAnimatedProps<PathProps>(() => {
    return {
      strokeDashoffset: withTiming(strokeDashoffset.value, { duration: 1500 }),
    };
  });

  useEffect(() => {
    strokeDashoffset.value = 0;
  }, []);

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
            {formatSuffix}
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
            <AnimatedPath
              animatedProps={animatedProps}
              d={data.path}
              stroke={colors.primary}
              strokeWidth={3.2}
              strokeDasharray={dash}
              strokeDashoffset={dash}
            />

            {data.xTicks.map(({ position, value }) => (
              <G key={value.getTime()} y={height - 26}>
                <Text fill="black" x={position} y={0} fontSize={12} textAnchor="middle">
                  {format(value, "HH:mm", { locale: ptBR })}
                </Text>
                <Text fill="black" x={position} y={12} fontSize={12} textAnchor="middle">
                  {format(value, "MM/dd", { locale: ptBR })}
                </Text>
              </G>
            ))}
          </Svg>
        </View>
      </ScrollView>
    </View>
  );
}
