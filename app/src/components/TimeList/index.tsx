import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Trash, Plus } from "phosphor-react-native";
import { useTheme } from "styled-components/native";
import uuid from "react-native-uuid";
import Animated, { Layout } from "react-native-reanimated";

import Title from "@components/Title";

import { Button, Container, Divider, Item, Text } from "./styles";

import { database } from "@utils/firebase";

import { get, query, ref, set } from "firebase/database";
import format from "date-fns/format";
import parse from "date-fns/parse";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import getHours from "date-fns/getHours";
import getMinutes from "date-fns/getMinutes";

interface ITimeListProps {
  title: string;
  isEnabled: boolean;
}

interface IItemListProps {
  icon: React.ReactNode;
  data: { index: number; date: string };
  isEnabled: boolean;
  onTimePress: (number, string) => void;
  onIconPress: (number, string) => void;
}

export default function TimeList({ title, isEnabled }: ITimeListProps) {
  const { colors } = useTheme();
  const [list, setList] = useState([]);

  const reference = ref(database, "/operation/scroll");

  useEffect(() => {
    (async () => {
      const list = await get(query(reference));

      setList(
        list.val().map((time) => {
          const date = setHours(
            setMinutes(new Date(), +time.toString().slice(-2)),
            +time.toString().slice(-4, 2)
          );

          return { id: uuid.v4().toString(), time: format(date, "HH:mm") };
        })
      );
    })();
  }, []);

  async function handleAddItem(index, time) {
    if (list.length > 3) return;

    setList((state) =>
      [...state, { id: uuid.v4().toString(), time }].sort((a, b) => {
        const dateA = parse(a.time, "HH:mm", new Date(0)).getTime();
        const dateB = parse(b.time, "HH:mm", new Date(0)).getTime();

        return dateA - dateB;
      })
    );

    uploadList();
  }

  async function handleUpdateList(index: number, date: string) {
    setList((prevState) => {
      const state = [...prevState];
      state[index].time = date;

      return state.sort((a, b) => {
        const dateA = parse(a.time, "HH:mm", new Date(0)).getTime();
        const dateB = parse(b.time, "HH:mm", new Date(0)).getTime();

        return dateA - dateB;
      });
    });

    uploadList();
  }

  async function handleRemoveItem(index: number) {
    setList((prevState) => {
      const state = [...prevState];
      state.splice(index, 1);
      return state;
    });

    uploadList();
  }

  async function uploadList() {
    const uploadList = list.map(({ time }) => {
      const parsed = parse(time, "HH:mm", new Date());

      const hours = getHours(parsed).toString();
      const minutes = getMinutes(parsed).toString();

      return +"".concat(hours, minutes);
    });

    set(reference, uploadList);
  }

  return (
    <Container>
      <Title>{title}</Title>
      <Divider />

      <ListItem
        icon={<Plus color={colors.primary} size={24} />}
        data={{ index: 999, date: format(new Date(), "HH:mm") }}
        onIconPress={handleAddItem}
        onTimePress={() => {}}
        isEnabled={isEnabled}
      />
      <Divider />
      {list.length !== 0 && (
        <>
          {list.map((item, i) => (
            <Animated.View key={item.id} layout={Layout}>
              <ListItem
                icon={<Trash color={colors.primary} size={24} />}
                data={{ index: i, date: item.time }}
                onIconPress={handleRemoveItem}
                onTimePress={handleUpdateList}
                isEnabled={isEnabled}
              />
            </Animated.View>
          ))}
        </>
      )}
    </Container>
  );
}

function ListItem({
  icon,
  data,
  onIconPress,
  onTimePress,
  isEnabled,
}: IItemListProps) {
  const [date, setDate] = useState(new Date());

  function handleShow() {
    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        value: date,
        onChange: (_, selectedDate) => {
          data.index !== 999 &&
            onTimePress(data.index, format(selectedDate, "HH:mm"));

          setDate(selectedDate);
        },
        mode: "time",
        is24Hour: true,
      });
    }
  }

  return (
    <>
      <Item
        style={
          isEnabled && {
            shadowColor: "#0000008f",
            elevation: 2,
          }
        }
      >
        <Button onPress={handleShow}>
          <Text>{data.index === 999 ? format(date, "HH:mm") : data.date}</Text>
        </Button>
        <Button onPress={() => onIconPress(data.index, format(date, "HH:mm"))}>
          {icon}
        </Button>
      </Item>
    </>
  );
}
