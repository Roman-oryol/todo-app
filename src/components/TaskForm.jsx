import { useState } from "react";
import Form from "./Form";
import FormField from "./FormField";
import { useTaskContext } from "../context/useTaskContext";

const TaskForm = () => {
  const { addTask, newTaskFieldRef } = useTaskContext();
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const trimmedTitle = newTaskTitle.trim();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!trimmedTitle) return;

    addTask(trimmedTitle);
    setNewTaskTitle("");
  };

  return (
    <Form className="gap-2" onFormSubmit={handleSubmit}>
      <FormField
        label="Новая задача"
        className="focus:border-emerald-600"
        value={newTaskTitle}
        onFormFieldInput={(e) => setNewTaskTitle(e.target.value)}
        newTaskFieldRef={newTaskFieldRef}
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
