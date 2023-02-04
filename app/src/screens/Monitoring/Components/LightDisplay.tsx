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

export default function LightDisplay() {
  const [light, setLight] = useState("");

  useEffect(() => {
    const light = query(
      ref(database, "operation/light"),
      orderByChild("time"),
      limitToLast(1)
    );
    const eventLight = onChildAdded(light, (data) => {
      setLight(data.val().value);
    });

    return () => {
      eventLight();
    };
  }, []);

  return (
    <InfoDisplay icon="light" value={light == "on" ? "Ligada" : "Desligada"} />
  );
}
