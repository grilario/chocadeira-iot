import type { ReactNode } from "react";

import { TextStyled } from "./styles"

interface ITitleProps {
  children: ReactNode;
}

export default function Text({ children }: ITitleProps) {
  return <TextStyled>{children}</TextStyled>;
}
