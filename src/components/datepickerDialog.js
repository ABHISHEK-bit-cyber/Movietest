import { Text, Pressable } from "react-native";
import { styles } from "./Style";
import { colors } from "../constants/colors";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { DatePickerDialogProps } from "../constants/interfaces";

const DatePickerDialog = ({ selectedDate, onPress }) => {
  return (
    <Pressable
      style={[styles.incomeSourceContainer, styles.fdHorizontal, styles.me5]}
      onPress={onPress}
    >
      <Text style={[styles.bold18styled, styles.container]}>
        {selectedDate}
      </Text>
      <MaterialIcons name="calendar-month" color="#1a73e8" size={24} />
    </Pressable>
  );
};

export default DatePickerDialog;
