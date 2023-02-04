import { useState } from "react";
import { Platform } from "react-native";
import format from "date-fns/format";
import parse from "date-fns/parse";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Trash, Plus } from "phosphor-react-native";
import { useTheme } from "styled-components/native";

import Title from "@components/Title";

import { Button, Container, Divider, Item, Text } from "./styles";

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

  const [list, setList] = useState([format(new Date(), "HH:mm")]);

  async function handleAddItem(index, time) {
    if (list.length > 3) return;

    setList((state) =>
      [...state, time].sort((a, b) => {
        const dateA = parse(a, "HH:mm", new Date(0)).getTime();
        const dateB = parse(b, "HH:mm", new Date(0)).getTime();

        return dateA - dateB;
      })
    );
  }

  async function handleUpdateList(index: number, date: string) {
    setList((prevState) => {
      const state = [...prevState];
      state[index] = date;

      return state.sort((a, b) => {
        const dateA = parse(a, "HH:mm", new Date(0)).getTime();
        const dateB = parse(b, "HH:mm", new Date(0)).getTime();

        return dateA - dateB;
      });
    });
  }

  async function handleRemoveItem(index: number) {
    setList((prevState) => {
      const state = [...prevState];
      state.splice(index, 1);
      return state;
    });
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
      {list.map((date, i) => (
        <ListItem
          key={i}
          icon={<Trash color={colors.primary} size={24} />}
          data={{ index: i, date }}
          onIconPress={handleRemoveItem}
          onTimePress={handleUpdateList}
          isEnabled={isEnabled}
        />
      ))}
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
