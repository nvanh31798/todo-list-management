import React, { useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import LoopIcon from "@mui/icons-material/Loop";
import FiberNewOutlinedIcon from "@mui/icons-material/FiberNewOutlined";
import { TodoStatus } from "../../redux/models/TodoStatus";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { removeTodo } from "../../redux/slice/todo/todoSlice";
import { useTodoHelper } from "../../helper/todoHelper";
import { CreateForm } from "../CreateForm/CreateForm";
import { TodoModel } from "../../redux/models/TodoModel";

export interface TodoCardProps {
  todo: TodoModel;
}

export const TodoCard = ({ todo }: TodoCardProps) => {
  const { removeTodoItem } = useTodoHelper();
  const getStatusIcon = (status: TodoStatus) => {
    switch (status) {
      case TodoStatus.DONE:
        return <DoneIcon fontSize="small" color="success" />;
      case TodoStatus.IN_PROGRESS:
        return <LoopIcon color="primary" />;
      default:
        return <FiberNewOutlinedIcon color="secondary" />;
    }
  };
  const handleRemove = () => {
    removeTodoItem(todo.id);
  };


  return (
    <div className="border-2 w-60 h-80 p-3 px-3 rounded-md overflow-scroll scrollbar-hide flex flex-col justify-between">
      <div>
        <div className="flex justify-between">
          {getStatusIcon(todo.status)}
          <button onClick={handleRemove}>
            <CloseOutlinedIcon fontSize="small" />
          </button>
        </div>
        <h1 className="font-semibold text-xl text-center p-2 mb-2">
          {todo.title}
        </h1>
        <p className="text-justify text-md">{todo.project}</p>
      </div>
      <div className="flex flex-row-reverse justify-between">
        <button>
          <ModeEditOutlineOutlinedIcon fontSize="small" />
        </button>
      </div>
    </div>
  );
};
