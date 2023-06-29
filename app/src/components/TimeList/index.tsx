import { useEffect, useState } from "react";
import { Platform } from "react-native";
import Animated, { Layout } from "react-native-reanimated";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Trash, Plus } from "phosphor-react-native";
import { useTheme } from "styled-components/native";

import format from "date-fns/format";
import parse from "date-fns/parse";

import { Button, Container, Divider, IconButton, Item, Text } from "./styles";
import { getCommand, sendCommand } from "@services/firebase";

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

  useEffect(() => {
    (async () => {
      const list = await getCommand("scroll");

      setList(list.map((value) => ({ id: uniqueID(), time: parse(value, "HH:mm", 0) })));
    })();
  }, []);

  async function handleAddItem(time: Date) {
    if (list.length > 3) return;

    setList((state) =>
      [...state, { id: uniqueID(), time }].sort((a, b) => {
        return a.time.getTime() - b.time.getTime();
      })
    );
  }

  async function handleUpdateList(id: number, time: Date) {
    setList((prevState) => {
      const newState = prevState.filter((time) => time.id !== id);
      newState.push({ id, time });

      newState.sort((a, b) => {
        return a.time.getTime() - b.time.getTime();
      });

      sendCommand(
        "scroll",
        newState.map(({ time }) => format(time, "HH:mm")),
        "Alterou rolagem dos ovos"
      );

      return newState;
    });
  }

  async function handleRemoveItem(id: number) {
    setList((prevState) => prevState.filter((time) => time.id !== id));
  }

  return (
    <Container>
      <ListItem
        icon={<Plus color={colors.white} size={18} />}
        data={{ id: null, time: new Date() }}
        addItem={handleAddItem}
      />

      <Divider />

      {list.map((time) => (
        <Animated.View key={time.id} layout={Layout}>
          <ListItem
            icon={<Trash color={colors.white} size={18} />}
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
      <IconButton
        onPress={() => {
          addItem && addItem(date);
          deleteItem && deleteItem(id);
        }}
      >
        {icon}
      </IconButton>
    </Item>
  );
}
