import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import TodoItem from "./TodoItem";
import * as Progress from "react-native-progress";
import { Entypo } from "@expo/vector-icons";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [completedCount, setCompletedCount] = useState(0);

  const handleAddTodo = () => {
    if (todoText !== "") {
      setTodos([...todos, { text: todoText, isChecked: false }]);
      setTodoText("");
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <TodoItem
        item={item.text}
        index={index}
        isChecked={item.isChecked}
        toggleChecked={toggleChecked}
        deleteTodo={handleDeleteTodo}
      />
    );
  };

  const toggleChecked = (index) => {
    const newTodos = [...todos];
    newTodos[index].isChecked = !newTodos[index].isChecked;
    setTodos(newTodos);

    if (newTodos[index].isChecked) {
      setCompletedCount((prevCount) => prevCount + 1);
    } else {
      setCompletedCount((prevCount) => prevCount - 1);
    }
  };

  const handleDeleteTodo = (index) => {
    if (todos[index].isChecked) {
      setCompletedCount((prevCount) => prevCount - 1);
    }
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Todo</Text>
        {todos.length >= 1 && (
          <View style={styles.progressContainer}>
            <Progress.Bar
              progress={todos.length > 0 ? completedCount / todos.length : 0}
              width={200}
            />
            <Text style={styles.progressText}>
              {todos.length > 0
                ? `${Math.floor(
                    (completedCount / todos.length) * 100
                  )}% Completed`
                : "0% Completed"}
            </Text>
          </View>
        )}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter a todo"
            value={todoText}
            onChangeText={(text) => setTodoText(text)}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
            <Entypo name="plus" size={25} color="white" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={todos}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.todoList}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  todoList: {
    marginTop: 20,
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  todoText: {
    flex: 1,
    fontSize: 18,
  },
  deleteButton: {
    color: "red",
    marginLeft: 10,
  },
  progressContainer: {
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: "5%",
    flexDirection: "row",
    marginBottom: "5%",
  },
  progressText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
