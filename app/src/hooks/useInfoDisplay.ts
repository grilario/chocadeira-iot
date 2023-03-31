import { useEffect, useState } from "react";
import { get, limitToLast, orderByChild, query, ref } from "firebase/database";

import { database } from "@utils/firebase";

export function useInfoDisplay(name: string, delay = 1000) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(async () => {
      const temperature = await get(
        query(
          ref(database, `operation/${name}`),
          orderByChild("time"),
          limitToLast(1)
        )
      );

      if (!temperature.exists()) {
        return
      }

      setValue(
        Object.values(temperature.val() as [{ value: number }])[0].value
      );
    }, delay);

    return () => clearInterval(interval);
  }, []);

  return value;
}
