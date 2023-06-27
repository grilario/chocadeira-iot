import { useState } from "react";
import { Platform } from "react-native";
import Animated, { Layout } from "react-native-reanimated";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Trash, Plus } from "phosphor-react-native";
import { useTheme } from "styled-components/native";

import format from "date-fns/format";
import parse from "date-fns/parse";

import { Button, Container, Divider, Item, Text } from "./styles";

function uniqueID() {
  return Math.floor(Math.random() * Date.now());
}

interface TimeItem {
  id: number;
  time: Date;
}

interface IItemListProps {
  icon: React.ReactNode;
  data: TimeItem;
  updateItem?: (id: number, time: Date) => void;
  deleteItem?: (id: number) => void;
  addItem?: (time: Date) => void;
}

export default function TimeList() {
  const { colors } = useTheme();

  const [list, setList] = useState<TimeItem[]>([]);

  async function handleAddItem(time: Date) {
    if (list.length > 3) return;

    setList((state) =>
      [...state, { id: uniqueID(), time }].sort((a, b) => {
        return a.time.getTime() - b.time.getTime();
      })
    );
  }

  async function handleUpdateList(id: number, time: Date) {
    console.log("Hello");

    setList((prevState) => {
      const newState = prevState.filter((time) => time.id !== id);
      newState.push({ id, time });

      newState.sort((a, b) => {
        return a.time.getTime() - b.time.getTime();
      });

      return [...newState];
    });
  }

  async function handleRemoveItem(id: number) {
    setList((prevState) => prevState.filter((time) => time.id !== id));
  }

  return (
    <Container>
      <Divider />

      <ListItem
        icon={<Plus color={colors.primary} size={24} />}
        data={{ id: null, time: new Date() }}
        addItem={handleAddItem}
      />
      <Divider />

      {list.map((time) => (
        <Animated.View key={time.id} layout={Layout}>
          <ListItem
            icon={<Trash color={colors.primary} size={24} />}
            data={time}
            deleteItem={handleRemoveItem}
            updateItem={handleUpdateList}
          />
        </Animated.View>
      ))}
    </Container>
  );
}

function ListItem({ icon, data: { id, time }, updateItem, deleteItem, addItem }: IItemListProps) {
  const [date, setDate] = useState(time);

  function handleShow() {
    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        value: date,
        onChange: (_, selectedTime) => {
          updateItem && updateItem(id, selectedTime);

          setDate(selectedTime);
        },
        mode: "time",
        is24Hour: true,
      });
    }
  }

  return (
    <Item style={{ elevation: 1.2 }}>
      <Button onPress={handleShow}>
        <Text>{format(date, "HH:mm")}</Text>
      </Button>
      <Button
        onPress={() => {
          addItem && addItem(date);
          deleteItem && deleteItem(id);
        }}
      >
        {icon}
      </Button>
    </Item>
  );
}
