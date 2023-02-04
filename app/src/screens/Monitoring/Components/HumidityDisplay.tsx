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

export default function HumidityDisplay() {
  const [humidity, setHumidity] = useState(0);

  useEffect(() => {
    const humidity = query(
      ref(database, "operation/humidity"),
      orderByChild("time"),
      limitToLast(1)
    );
    const eventHumidity = onChildAdded(humidity, (data) => {
      setHumidity(data.val().value);
    });

    return () => {
      eventHumidity();
    };
  }, []);

  return <InfoDisplay icon="humidity" value={humidity + "%"} />;
}
