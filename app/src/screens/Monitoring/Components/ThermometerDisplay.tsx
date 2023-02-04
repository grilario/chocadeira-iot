import { useEffect, useState } from "react";
import {
  limitToLast,
  onChildAdded,
  orderByChild,
  query,
  ref,
} from "firebase/database";

import InfoDisplay from "@components/InfoDisplay";
import { database } from "@utils/firebase";

export default function ThermometerDisplay() {
  const [temperature, setTemperature] = useState(0);

  useEffect(() => {
    const temperature = query(
      ref(database, "operation/temperature"),
      orderByChild("time"),
      limitToLast(1)
    );
    const eventTemperature = onChildAdded(temperature, (data) => {
      setTemperature(data.val().value);
    });

    return () => {
      eventTemperature();
    };
  }, []);

  return <InfoDisplay icon="thermometer" value={temperature + "°C"} />;
}
