import { TodoStatus } from "./TodoStatus";

export interface TodoModel {
  id: number;
  title: string;
  project: string;
  startOn?: Date;
  duration?: number;
  frame?: string;
  assignee?: string;
  file?: File;
  status: TodoStatus;
  imgUrl?: string;
}
