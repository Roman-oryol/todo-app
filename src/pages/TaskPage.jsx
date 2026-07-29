import { useTaskContext } from "../context/useTaskContext";
import { navigate } from "../router/navigate";

const TaskPage = ({ params }) => {
  const { tasks, isLoading } = useTaskContext();
  const task = tasks.find((t) => t.id === params.id);

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-zinc-800 border-t-emerald-500" />
      </div>
    );
  }

  if (!task) {
    return <p className="text-center text-red-400">Задача не найдена</p>;
  }

  return (
    <div className="align-center flex flex-col items-center gap-6">
      <h1 className="text-center text-xl font-semibold text-zinc-200">
        {task.title}
      </h1>
      <span
        className={`inline-block rounded-lg px-3.5 py-1.5 text-sm ${
          task.isCompleted
            ? "bg-emerald-500/10 text-emerald-400"
            : "bg-amber-500/10 text-amber-400"
        }`}
      >
        {task.isCompleted ? "Задача выполнена" : "Задача не выполнена"}
      </span>
      <button
        onClick={() => navigate("/")}
        className="cursor-pointer text-sm text-zinc-400 transition-colors hover:text-zinc-200"
      >
        ← Назад к списку
      </button>
    </div>
  );
};

export default TaskPage;
