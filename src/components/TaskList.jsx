import TaskItem from "./TaskItem";

const TaskList = ({
  tasks = [],
  filteredTasks,
  toggleTaskCompleted,
  deleteTask,
  firstIncompleteTaskRef,
  firstIncompleteTaskId,
  highlightedTaskId,
}) => {
  const isEmptyTasks = tasks.length === 0;

  if (filteredTasks?.length === 0) {
    return (
      <div className="mx-auto w-[60%] text-center text-zinc-500">
        Задача не найдена
      </div>
    );
  }

  return (
    <>
      <style>{`

        /* Dark themed custom scrollbar for the task list */
        .task-list-scroll::-webkit-scrollbar { width: 10px; height: 10px;}
        .task-list-scroll::-webkit-scrollbar-track { background: #1f2937; border-radius: 8px; }
        .task-list-scroll::-webkit-scrollbar-thumb { background: #374151; border-radius: 8px; }
        .task-list-scroll::-webkit-scrollbar-thumb:hover { background: #4b5563; }

        /* Firefox */
        .task-list-scroll { scrollbar-width: thin; scrollbar-color: #374151 #1f2937; }
      `}</style>

      <ul className="task-list-scroll grid gap-3 overflow-auto">
        {isEmptyTasks ? (
          <div className="mx-auto w-[60%] text-center text-zinc-500">
            Список задач пока пуст.
            <br />
            Добавьте первую задачу
          </div>
        ) : (
          (filteredTasks ?? tasks).map((task) => (
            <TaskItem
              key={task.id}
              ref={
                firstIncompleteTaskId == task.id ? firstIncompleteTaskRef : null
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
