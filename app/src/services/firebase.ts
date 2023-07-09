import { initializeApp } from "@firebase/app";
import { get, getDatabase, query, ref, orderByChild, startAt, set, push, limitToLast } from "@firebase/database";
import { EventEmitter } from "eventemitter3";

import subDays from "date-fns/subDays";

import type { Data } from "@services/graph";

const app = initializeApp({ databaseURL: "https://chocadeira-68d24-default-rtdb.firebaseio.com/" });
const database = getDatabase(app);

export function realtimeSensor(delay: number) {
  const event = new EventEmitter();

  const request = query(ref(database, "current"));

  const fetch = async () => {
    const response = await get(request);
    const { temperature, humidity, ...data } = response.val();

    event.emit("change", {
      ...data,
      humidity: Math.round(humidity * 10) / 10,
      temperature: Math.round(temperature * 10) / 10,
    });
  };

  fetch();
  const interval = setInterval(fetch, delay);

  return { event, unmount: () => clearInterval(interval) };
}

export async function graphData(graph: "temperature" | "humidity"): Promise<Data[][]> {
  const todayRequest = get(
    query(ref(database, `data/${graph}`), orderByChild("time"), startAt(subDays(Date.now(), 1).getTime(), "time"))
  );
  const sevenDaysRequest = get(
    query(ref(database, `data/${graph}`), orderByChild("time"), startAt(subDays(Date.now(), 7).getTime(), "time"))
  );
  const twentyOneDaysRequest = get(
    query(ref(database, `data/${graph}`), orderByChild("time"), startAt(subDays(Date.now(), 21).getTime(), "time"))
  );

  const responses = await Promise.all([todayRequest, sevenDaysRequest, twentyOneDaysRequest]);

  return responses.map((response) =>
    response.exists()
      ? Object.values(response.val())
      : [
          { time: subDays(Date.now(), 1).getTime(), value: 0 },
          { time: Date.now(), value: 0 },
        ]
  );
}

export async function getCommand(path: string) {
  const response = await get(query(ref(database, `control/${path}`)));

  return response.exists() ? response.val() : [];
}

export async function sendCommand(path: string, value: unknown, name: string) {
  try {
    set(ref(database, `control/${path}`), value);
    push(ref(database, `historic`), { name, time: { ".sv": "timestamp" } });
  } catch {}
}

export async function getHistoric() {
  const response = await get(query(ref(database, "historic"), orderByChild("time"), limitToLast(100)));

  return response.exists() ? Object.values(response.val()).reverse() : [];
}
