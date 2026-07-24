import { useTaskContext } from "../context/useTaskContext";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const {
    tasks,
    filteredTasks,
    firstIncompleteTaskRef,
    firstIncompleteTaskId,
    toggleTaskCompleted,
    deleteTask,
    highlightedTaskId,
  } = useTaskContext();

  const isEmptyTasks = tasks.length === 0;
  const displayedTasks = filteredTasks ?? tasks;

  if (displayedTasks.length === 0 && !isEmptyTasks) {
    return (
      <div className="mx-auto w-[60%] text-center text-zinc-500">
        Задача не найдена
      </div>
    );
  }

  return (
    <>
      <ul className="task-list-scroll grid gap-3 overflow-auto pb-0.5">
        {isEmptyTasks ? (
          <div className="mx-auto w-[60%] text-center text-zinc-500">
            Список задач пока пуст.
            <br />
            Добавьте первую задачу
          </div>
        ) : (
          displayedTasks.map((task) => (
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
          ))
        )}
      </ul>
    </>
  );
};

export default TaskList;
