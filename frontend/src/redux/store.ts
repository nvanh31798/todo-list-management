import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "./slice/counter/counterSlice";
import todoReducer from "./slice/todo/todoSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todo: todoReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
