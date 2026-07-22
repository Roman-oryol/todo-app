import { memo, useContext, useMemo } from 'react';
import { TaskContext } from '../context/TaskContext';

const TodoInfo = () => {
  const { tasks, deleteAllTasks } = useContext(TaskContext);

  const done = useMemo(() => {
    return tasks.filter(({ isDone }) => isDone).length;
  }, [tasks]);

  const total = tasks.length;
  const hasTasks = total > 0;

  return (
    <div className="todo__info">
      <div className="todo__total-tasks">
        Выполнено {done} из {total}
      </div>
      {hasTasks && (
        <button
          className="todo__delete-all-button"
          type="button"
          onClick={deleteAllTasks}
        >
          Удалить всё
        </button>
      )}
    </div>
  );
};

export default memo(TodoInfo);
