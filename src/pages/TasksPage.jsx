import TodoApp from "../components/TodoApp";
import { TaskProvider } from "../context/TaskProvider";

const TasksPage = () => {
  return (
    <TaskProvider>
      <TodoApp />
    </TaskProvider>
  );
};

export default TasksPage;
