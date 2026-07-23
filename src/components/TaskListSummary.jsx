import { Target } from "lucide-react";
import { useState } from "react";
import DeleteAllDialog from "./DeleteAllDialog";
import { useTaskContext } from "../context/useTaskContext";

const TaskListSummary = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    completedTasks,
    tasks,
    deleteAllTasks,
    scrollToFirstIncomplete,
    firstIncompleteTaskId,
  } = useTaskContext();
  const totalTasks = tasks.length;

  const handleConfirm = () => {
    deleteAllTasks();
    setIsDialogOpen(false);
  };

  return (
    <div className="flex items-center justify-between text-sm leading-6">
      <span className={`text-zinc-400 ${totalTasks === 0 && "hidden"}`}>
        Выполнено{" "}
        <span className="font-semibold text-emerald-400">{completedTasks}</span>{" "}
        из {totalTasks}
      </span>
      <div className="relative flex items-center gap-3">
        {firstIncompleteTaskId && (
          <button
            onClick={scrollToFirstIncomplete}
            className="text-zinc-400 transition-colors hover:scale-110 hover:text-emerald-500 active:scale-100"
            title="К первой невыполненной"
          >
            <Target size={24} />
          </button>
        )}
        {totalTasks !== 0 && (
          <button
            className="text-rose-400 transition-all hover:text-rose-300 active:opacity-50"
            onClick={() => setIsDialogOpen(true)}
          >
            Удалить всё
          </button>
        )}
        <DeleteAllDialog
          isOpen={isDialogOpen}
          onConfirm={handleConfirm}
          onCancel={() => setIsDialogOpen(false)}
        />
      </div>
    </div>
  );
};

export default TaskListSummary;
