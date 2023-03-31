import { FlatList, RefreshControl } from "react-native";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import {
  Container,
  Item,
  Separator,
  Title,
  Text,
  TimeIndicator,
} from "./styles";
import { useEffect, useState } from "react";
import { get, ref, query, orderByChild, limitToLast } from "firebase/database";
import { database } from "@utils/firebase";

export default function History() {
  const [refreshing, setRefreshing] = useState(true);
  const [data, setData] = useState([]);

  async function loadHistory() {
    try {
      const response = await get(
        query(ref(database, "/history"), limitToLast(60), orderByChild("time"))
      );

      setData(Object.values(response.val()).reverse() as []);
      setRefreshing(false);
    } catch (error) {}
  }

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <Container>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => (
          <Item>
            <Text style={{ textTransform: "capitalize" }}>{item.title}</Text>
            <TimeIndicator>
              {formatDistanceToNow(item.time, { addSuffix: true }).replace(
                /^\w/,
                function ($0) {
                  return $0.toUpperCase();
                }
              )}
            </TimeIndicator>
          </Item>
        )}
        ItemSeparatorComponent={<Separator />}
        ListHeaderComponent={<Title>Histórico de comandos</Title>}
        ListHeaderComponentStyle={{ marginVertical: 20 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadHistory} />
        }
      />
    </Container>
  );
}
