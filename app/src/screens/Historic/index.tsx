import { useEffect, useState } from "react";
import { FlatList, RefreshControl } from "react-native";

import formatDistanceToNow from "date-fns/formatDistanceToNow";
import ptBR from "date-fns/locale/pt-BR";

import { getHistoric } from "@services/firebase";

import { HistoricItem, HistoricLabel, HistoricTime, Separator, Title } from "./styles";

type Historic = { name: string; time: number }[];

export default function Historic() {
  const [refreshing, setRefreshing] = useState(true);
  const [historic, setHistoric] = useState<Historic>();

  const loadHistoric = async () => {
    try {
      const historic = await getHistoric();

      setHistoric(historic as Historic);
      setRefreshing(false);
    } catch {}
  };

  useEffect(() => {
    loadHistoric();
  }, []);

  return (
    <FlatList
      nestedScrollEnabled={true}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 20 }}
      ItemSeparatorComponent={Separator}
      ListHeaderComponent={<Title>Histórico de Comandos</Title>}
      ListHeaderComponentStyle={{ marginBottom: 20 }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadHistoric} />}
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
