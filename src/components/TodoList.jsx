import TodoItem from './TodoItem';

const TodoList = ({
  tasks = [],
  onDeleteTaskButtonClick,
  onTaskCompleteChange,
  filteredTasks,
  firstIncompleteTaskRef,
  firstIncompleteTaskId,
}) => {
  const hasTasks = tasks.length > 0;
  const isEmptyFilteredTasks = filteredTasks?.length === 0;

  if (!hasTasks) {
    return <div className="todo__empty-message">Пока нет задач.</div>;
  }

  if (hasTasks && isEmptyFilteredTasks) {
    return <div className="todo__empty-message">Задача не найдена.</div>;
  }

  return (
    <ul className="todo__list">
      {(filteredTasks ?? tasks).map((task) => (
        <TodoItem
          className="todo__item"
          key={task.id}
          ref={
            task.id === firstIncompleteTaskId ? firstIncompleteTaskRef : null
          }
          {...task}
          onDeleteTaskButtonClick={onDeleteTaskButtonClick}
          onTaskCompleteChange={onTaskCompleteChange}
        />
      ))}
    </ul>
  );
};

export default TodoList;
