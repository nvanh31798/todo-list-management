import { TodoCard } from "../TodoCard/TodoCard";
import { useTodoHelper } from "../../helper/todoHelper";
import StickyHeadTable from "../StickyHeadTable/StickyHeadTable";

export const TodoList = () => {
  const { todoList } = useTodoHelper();

  return (
    <div className="flex flex-wrap gap-10">
      <StickyHeadTable data={todoList} />
    </div>
  );
};
