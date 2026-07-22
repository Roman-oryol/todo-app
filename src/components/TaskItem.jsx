import { Check } from "lucide-react";
import { Trash2 } from "lucide-react";

const TaskItem = ({
  task,
  onToggleComplete,
  onTaskDelete,
  ref,
  isHighlighted,
}) => {
  return (
    <li
      className={`flex items-center gap-3 rounded-lg border px-3 py-2 transition-colors duration-500 ${
        isHighlighted
          ? "border-emerald-500 bg-emerald-500/10"
          : "border-zinc-700 bg-zinc-800"
      }`}
      ref={ref}
    >
      <div className="relative flex h-5 w-5">
        <input
          className="peer h-5 w-5 appearance-none rounded border border-zinc-600 bg-transparent checked:border-emerald-700 checked:bg-emerald-700 hover:border-zinc-300"
          type="checkbox"
          onChange={(e) => onToggleComplete(task.id, e.target.checked)}
          checked={task.isCompleted}
        />
        <Check
          size={14}
          strokeWidth={3}
          className="pointer-events-none absolute inset-0 m-auto text-white opacity-0 peer-checked:opacity-100"
        />
      </div>
      <span
        className={`min-w-0 flex-1 wrap-break-word ${task.isCompleted ? "text-zinc-500 line-through" : "text-zinc-100"}`}
      >
        {task.title}
      </span>
      <button
        className="cursor-pointer text-zinc-600 transition-colors hover:scale-110 hover:text-rose-400 active:scale-100 active:text-rose-300"
        onClick={() => onTaskDelete(task.id)}
      >
        <Trash2 size={16} />
      </button>
    </li>
  );
};

export default TaskItem;
