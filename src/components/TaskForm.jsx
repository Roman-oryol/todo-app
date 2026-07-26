import { useState } from "react";
import Form from "./Form";
import FormField from "./FormField";
import { useTaskContext } from "../context/useTaskContext";

const TaskForm = () => {
  const { addTask, newTaskFieldRef } = useTaskContext();
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [touched, setTouched] = useState(false);

  const trimmedTitle = newTaskTitle.trim();
  const isEmpty =
    touched && newTaskTitle.length > 0 && trimmedTitle.length === 0;
  const error = isEmpty ? "Задача не может быть пустой" : "";

  const handleSubmit = () => {
    if (!trimmedTitle) return;

    addTask(trimmedTitle);
    setNewTaskTitle("");
    setTouched(false);
  };

  const handleInput = (e) => {
    setNewTaskTitle(e.target.value);
    setTouched(true);
  };

  return (
    <Form className="gap-2" onFormSubmit={handleSubmit}>
      <FormField
        label="Новая задача"
        className="focus:border-emerald-600"
        value={newTaskTitle}
        onFormFieldInput={handleInput}
        newTaskFieldRef={newTaskFieldRef}
        error={error}
      />
      <button
        className={`cursor-not-allowed rounded-lg bg-emerald-700 px-4 py-2 font-semibold text-zinc-100 transition-colors ${!trimmedTitle ? "opacity-40" : "cursor-pointer hover:bg-emerald-600 active:translate-y-0.5"}`}
      >
        Добавить
      </button>
    </Form>
  );
};

export default TaskForm;
