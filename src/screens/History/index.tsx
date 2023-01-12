import { FlatList } from "react-native";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import Title from "@components/Title";

import { Container, Item, Text, TimeIndicator } from "./styles";

export default function History() {
  const data = new Array(80).fill({
    action: "Power off",
    date: new Date(),
  });

  return (
    <Container>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 20 }}
        data={data}
        renderItem={({ item }) => (
          <Item>
            <Text>{item.action}</Text>
            <TimeIndicator>
              {formatDistanceToNow(item.date, { addSuffix: true })}
            </TimeIndicator>
          </Item>
        )}
        ListHeaderComponent={<Title>Histórico de comandos</Title>}
        ListHeaderComponentStyle={{ marginVertical: 20 }}
      />
    </Container>
  );
}
