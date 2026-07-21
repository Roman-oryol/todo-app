import Button from './Button';
import Field from './Field';

const AddTaskForm = ({
  addTask,
  newTaskTitle,
  setNewTaskTitle,
  newTaskInputRef,
}) => {
  const onSubmit = (event) => {
    event.preventDefault();
    addTask();
  };

  return (
    <form className="todo__form" onSubmit={onSubmit}>
      <Field
        className="todo__field"
        id="new-task"
        label="Новая задача"
        value={newTaskTitle}
        onInput={(event) => setNewTaskTitle(event.target.value)}
        ref={newTaskInputRef}
      />
      <Button type="submit">Добавить</Button>
    </form>
  );
};

export default AddTaskForm;
