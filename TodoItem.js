import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";

const TodoItem = ({ item, index, isChecked, toggleChecked, deleteTodo }) => {
  return (
    <View style={styles.todoItem}>
      <TouchableOpacity onPress={() => toggleChecked(index)}>
        <View
          style={isChecked ? styles.checkboxChecked : styles.checkbox}
        ></View>
      </TouchableOpacity>
      <Text style={[styles.todoText, isChecked ? styles.checkedText : null]}>
        {item}
      </Text>
      <TouchableOpacity onPress={() => deleteTodo(index)}>
        <Entypo name="circle-with-minus" size={25} color="red" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginRight: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderColor: "gray",
    borderWidth: 2,
    marginRight: 10,
  },
  checkboxChecked: {
    width: 20,
    height: 20,
    backgroundColor: "green",
    marginRight: 10,
  },
  todoText: {
    flex: 1,
    fontSize: 18,
  },
  checkedText: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  deleteButton: {
    color: "red",
    marginLeft: 10,
  },
});

export default TodoItem;
