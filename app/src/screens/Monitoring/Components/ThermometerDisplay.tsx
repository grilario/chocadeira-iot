import InfoDisplay from "@components/InfoDisplay";
import { useInfoDisplay } from "@hooks/useInfoDisplay";

export default function ThermometerDisplay() {
  const temperature = useInfoDisplay("temperature");

  return <InfoDisplay icon="thermometer" value={temperature + "°C"} />;
}
