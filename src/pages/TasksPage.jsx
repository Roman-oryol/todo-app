import TaskForm from "../components/TaskForm";
import SearchForm from "../components/SearchForm";
import TaskListSummary from "../components/TaskListSummary";
import TaskList from "../components/TaskList";

const TasksPage = () => {
  return (
    <>
      <h1 className="text-center text-2xl font-bold text-zinc-300">
        Список задач
      </h1>
      <TaskForm />
      <SearchForm />
      <TaskListSummary />
      <TaskList />
    </>
  );
};

export default TasksPage;
