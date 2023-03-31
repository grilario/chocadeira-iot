import { useEffect, useState } from "react";
import { get, orderByChild, query, ref, startAt } from "firebase/database";
import subHours from "date-fns/subHours";
import { database } from "@utils/firebase";

import { DataPoint } from "@components/Chart";
import { simplifyList } from "@utils/data";

export interface IData {
  today: DataPoint[];
  threeDays: DataPoint[];
  week: DataPoint[];
}

export default function useGraphData(graph: string): [IData, boolean] {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<IData>({} as IData);

  useEffect(() => {
    (async () => {
      const todayQuery = query(
        ref(database, `operation/${graph}`),
        orderByChild("time"),
        startAt(subHours(new Date(), 24).getTime(), "time")
      );
      const threeDaysQuery = query(
        ref(database, `operation/${graph}`),
        orderByChild("time"),
        startAt(subHours(new Date(), 24 * 3).getTime(), "time")
      );
      const weekQuery = query(
        ref(database, `operation/${graph}`),
        orderByChild("time"),
        startAt(subHours(new Date(), 24 * 7).getTime(), "time")
      );

      try {
        const today = await get(todayQuery);
        const threeDays = await get(threeDaysQuery);
        const week = await get(weekQuery);

        if (!today.exists() || !threeDays.exists() || !week.exists()) {
          throw Error("Object to be empty");
        }

        setData({
          today: simplifyList(Object.values(today.val()), 12),
          threeDays: simplifyList(Object.values(threeDays.val()), 8 * 3),
          week: simplifyList(Object.values(week.val()), 6 * 7),
        });
      } catch (error) {
        setData({
          today: [],
          threeDays: [],
          week: [],
        });
      }

      setIsLoading(false);
    })();
  }, []);

  return [data, isLoading];
}
