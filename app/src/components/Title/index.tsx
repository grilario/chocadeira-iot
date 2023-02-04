import type { ReactNode } from "react";

import { Text } from "./styles"

interface ITitleProps {
  children: ReactNode;
}

export default function Title({ children }: ITitleProps) {
  return <Text>{children}</Text>;
}
