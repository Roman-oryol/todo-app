import SearchForm from "./SearchForm";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import TaskListSummary from "./TaskListSummary";

const TodoApp = () => {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-6">
        <div className="grid h-[80vh] w-full max-w-md content-start gap-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h1 className="text-center text-2xl font-bold text-zinc-300">
            Список задач
          </h1>
          <TaskForm />
          <SearchForm />
          <TaskListSummary />
          <TaskList />
        </div>
      </div>
    </>
  );
};

export default TodoApp;
