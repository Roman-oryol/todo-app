import { Check, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { memo } from "react";
import Link from "./Link";

const TaskItem = ({
  task,
  onToggleComplete,
  onTaskDelete,
  ref,
  isHighlighted,
}) => {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 0, scale: 0.96 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`flex scroll-my-3 items-center gap-3 rounded-lg border px-3 py-2 transition-colors duration-500 ${
        isHighlighted
          ? "border-emerald-500 bg-emerald-500/10 "
          : "border-zinc-700 bg-zinc-800 "
      }`}
      ref={ref}
    >
      <div className="relative flex h-5 w-5">
        <input
          className="peer h-5 w-5 appearance-none rounded border border-zinc-600 bg-transparent checked:border-emerald-700 checked:bg-emerald-700 hover:border-zinc-300"
          id={task.id}
          type="checkbox"
          onChange={(e) => onToggleComplete(task.id, e.target.checked)}
          checked={task.isCompleted}
        />
        <Check
          size={14}
          strokeWidth={3}
          className="pointer-events-none absolute inset-0 m-auto text-white opacity-0 peer-checked:opacity-100"
        />
        <label className="sr-only" htmlFor={task.id}>
          Отметить задачу «{task.title}» как выполненную
        </label>
      </div>
      <Link
        to={`tasks/${task.id}`}
        className={`min-w-0 flex-1 wrap-break-word transition-colors hover:text-emerald-400 ${
          task.isCompleted
            ? "text-zinc-500 line-through "
            : "text-zinc-100 hover:underline"
        }`}
      >
        {task.title}
        <span className="sr-only"> — подробности</span>
      </Link>
      <button
        className="cursor-pointer text-zinc-600 transition-colors hover:scale-110 hover:text-rose-400 active:scale-100 active:text-rose-300"
        onClick={() => onTaskDelete(task.id)}
      >
        <Trash2 size={16} />
      </button>
    </motion.li>
  );
};

export default memo(TaskItem);
