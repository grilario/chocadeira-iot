import InfoDisplay from "@components/InfoDisplay";
import { useInfoDisplay } from "@hooks/useInfoDisplay";

export default function HumidityDisplay() {
  const humidity = useInfoDisplay("humidity");

  return <InfoDisplay icon="humidity" value={humidity + "%"} />;
}
