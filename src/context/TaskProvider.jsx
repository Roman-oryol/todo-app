import { TaskContext } from "./TaskContext";
import { useTasks } from "../hooks/useTasks";
import { useIncompleteTaskScroll } from "../hooks/useIncompleteTaskScroll";

export const TaskProvider = ({ children }) => {
  const taskState = useTasks();
  const scrollState = useIncompleteTaskScroll(taskState.tasks);

  const value = { ...taskState, ...scrollState };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
