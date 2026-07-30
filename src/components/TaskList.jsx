import { AnimatePresence } from "motion/react";
import { useTaskContext } from "../context/useTaskContext";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const {
    tasks,
    isLoading,
    filteredTasks,
    firstIncompleteTaskRef,
    firstIncompleteTaskId,
    toggleTaskCompleted,
    deleteTask,
    highlightedTaskId,
  } = useTaskContext();

  const isEmptyTasks = tasks.length === 0;
  const displayedTasks = filteredTasks ?? tasks;

  if (isLoading) {
    return (
      <div className="flex justify-center py-6">
        <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-zinc-800 border-t-emerald-500" />
      </div>
    );
  }

  if (displayedTasks.length === 0 && !isEmptyTasks) {
    return (
      <div className="mx-auto w-[60%] text-center text-zinc-500">
        Задача не найдена
      </div>
    );
  }

  return (
    <ul className="task-list-scroll relative grid min-h-0 content-start gap-3 overflow-x-hidden overflow-y-auto pb-0.5">
      {isEmptyTasks ? (
        <div className="mx-auto w-[60%] text-center text-zinc-500">
          Список задач пока пуст.
          <br />
          Добавьте первую задачу
        </div>
      ) : (
        <AnimatePresence mode="popLayout" initial={false}>
          {displayedTasks.map((task) => (
            <TaskItem
              key={task.id}
              ref={
                firstIncompleteTaskId === task.id
                  ? firstIncompleteTaskRef
                  : null
              }
              isHighlighted={task.id === highlightedTaskId}
              onToggleComplete={toggleTaskCompleted}
              task={task}
              onTaskDelete={deleteTask}
            />
          ))}
        </AnimatePresence>
      )}
    </ul>
  );
};

export default TaskList;
