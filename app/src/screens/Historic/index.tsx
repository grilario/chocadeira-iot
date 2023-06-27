import { useState } from "react";
import { FlatList } from "react-native";

import formatDistanceToNow from "date-fns/formatDistanceToNow";
import ptBR from "date-fns/locale/pt-BR";

import { HistoricItem, HistoricLabel, HistoricTime, Separator, Title } from "./styles";

type Historic = { name: string; time: number }[];

export default function Historic() {
  const [historic, setHistoric] = useState<Historic>(
    Array.from({ length: 100 }).fill({ name: "Testando", time: Date.now() }) as Historic
  );

  return (
    <FlatList
      nestedScrollEnabled={true}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 20 }}
      ItemSeparatorComponent={Separator}
      ListHeaderComponent={<Title>Histórico de Comandos</Title>}
      ListHeaderComponentStyle={{ marginBottom: 20 }}
      data={historic}
      renderItem={({ item: { name, time } }) => (
        <HistoricItem key={time}>
          <HistoricLabel>{name}</HistoricLabel>
          <HistoricTime>
            {formatDistanceToNow(time, { addSuffix: true, locale: ptBR }).replace(/^\w/, function ($0) {
              return $0.toUpperCase();
            })}
          </HistoricTime>
        </HistoricItem>
      )}
    />
  );
}
