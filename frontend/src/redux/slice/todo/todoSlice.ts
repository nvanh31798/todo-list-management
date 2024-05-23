import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TodoModel } from "../../models/TodoModel";

export interface TodoState {
  todoList: TodoModel[];
  isFormOpen: boolean;
}

const initialState: TodoState = {
  todoList: [],
  isFormOpen: false,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    createTodo: (state, action: PayloadAction<TodoModel>) => {
      if (!state.todoList) {
        state.todoList = [action.payload];
        return
      }
      state.todoList = [...state.todoList, action.payload];
    },
    createListTodo: (state, action: PayloadAction<TodoModel[]>) => {
      state.todoList = [...action.payload];
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todoList = state.todoList.filter(
        (todo) => todo.id !== action.payload
      );
    },
    updateTodo: (state, action: PayloadAction<TodoModel>) => {
      state.todoList = state.todoList.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
    },
    openForm: (state, action: PayloadAction<boolean>) => {
      state.isFormOpen = action.payload;
    },
  },

  extraReducers: () => {},
});

export const { createTodo, removeTodo, updateTodo, openForm, createListTodo } =
  todoSlice.actions;
export default todoSlice.reducer;
