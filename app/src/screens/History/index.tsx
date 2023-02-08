import { FlatList } from "react-native";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import {
  Container,
  Item,
  Separator,
  Title,
  Text,
  TimeIndicator,
} from "./styles";

export default function History() {
  const data = new Array(80).fill({
    action: "Power off",
    date: new Date(),
  });

  return (
    <Container>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => (
          <Item>
            <Text>{item.action}</Text>
            <TimeIndicator>
              {formatDistanceToNow(item.date, { addSuffix: true }).replace(
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
      />
    </Container>
  );
}
