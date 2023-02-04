import type { ReactNode } from "react";
import { TextStyle } from "react-native";

import { TextStyled } from "./styles";

interface ITitleProps {
  children: ReactNode;
  style?: TextStyle;
}

export default function Text({ children, style }: ITitleProps) {
  return <TextStyled style={style}>{children}</TextStyled>;
}
