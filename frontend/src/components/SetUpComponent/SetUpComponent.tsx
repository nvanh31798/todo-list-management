import React, { useEffect } from "react";
import { TodoModel } from "../../redux/models/TodoModel";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createListTodo } from "../../redux/slice/todo/todoSlice";

interface SetUpComponentProps {
  children?: React.ReactNode;
}

export const SetUpComponent = (props: SetUpComponentProps) => {
  const dispatch = useAppDispatch();
  const todoListStored = useAppSelector((state) => state.todo.todoList);

  useEffect(() => {
    const todolistStorage = localStorage.getItem("todoList");
    if (!todolistStorage?.length || todoListStored.length) {
      return;
    }
    const todoList = JSON.parse(todolistStorage) as TodoModel[];
    dispatch(createListTodo(todoList));
  }, []);

  return <>{props.children}</>;
};
