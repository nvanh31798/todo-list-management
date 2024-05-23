import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { TodoModel } from "../redux/models/TodoModel";
import {
  createTodo,
  removeTodo,
  updateTodo,
} from "../redux/slice/todo/todoSlice";

export const useTodoHelper = () => {
  const dispatch = useAppDispatch();
  const todoList = useAppSelector((state) => state.todo.todoList);

  const getNewTodoId = (): number => {
    if (!todoList.length) {
      return 1;
    }

    const sortedList = [...todoList];
    sortedList.sort((item1, item2) => item1.id - item2.id);
    return sortedList[sortedList.length - 1].id + 1;
  };

  const createTodoItem = (todo: TodoModel) => {
    const newId = getNewTodoId();
    const newTodo: TodoModel = { ...todo, id: newId };
    dispatch(createTodo(newTodo));
    localStorage.setItem("todoList", JSON.stringify([...todoList, newTodo]));
  };

  const removeTodoItem = (id: number) => {
    dispatch(removeTodo(id));
    const newTodoList = todoList.filter((todo) => todo.id !== id);
    localStorage.setItem("todoList", JSON.stringify(newTodoList));
  };

  const updateTodoItem = (todo: TodoModel) => {
    console.log(todo)
    dispatch(updateTodo(todo));
    const updatedTodoList = todoList.map((item) =>
      item.id === todo.id ? todo : item
    );
    localStorage.setItem("todoList", JSON.stringify(updatedTodoList));
  };

  return { todoList, createTodoItem, removeTodoItem, updateTodoItem };
};
