import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export const IconButton = ({ iconName, onPress, color }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name={iconName} size={24} color={color} />
    </TouchableOpacity>
  );
};
