import InfoDisplay from "@components/InfoDisplay";
import { useInfoDisplay } from "@hooks/useInfoDisplay";

export default function LightDisplay() {
  const light = useInfoDisplay("light");

  return (
    <InfoDisplay icon="light" value={light == 1 ? "Ligada" : "Desligada"} />
  );
}
