// useTasks.js
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocalStorageState } from "./useLocalStorageState";

const DEFAULT_TASKS = [
  {
    id: crypto.randomUUID(),
    title: "Купить молоко, очень, очень, очень много молока",
    isCompleted: false,
  },
  {
    id: crypto.randomUUID(),
    title: "Убраться в квартире",
    isCompleted: true,
  },
];

export const useTasks = () => {
  const [tasks, setTasks] = useLocalStorageState("tasks", DEFAULT_TASKS);
  const [searchQuery, setSearchQuery] = useState("");
  const newTaskFieldRef = useRef(null);

  useEffect(() => {
    newTaskFieldRef.current?.focus();
  }, []);

  const filteredTasks = searchQuery.trim()
    ? tasks.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : null;

  const completedTasks = tasks.reduce(
    (acc, task) => (task.isCompleted ? acc + 1 : acc),
    0,
  );

  const addTask = (title) => {
    setTasks((curr) => [
      ...curr,
      { id: crypto.randomUUID(), title, isCompleted: false },
    ]);
    newTaskFieldRef.current?.focus();
    setSearchQuery("");
  };

  const toggleTaskCompleted = useCallback(
    (id, isCompleted) => {
      setTasks((curr) =>
        curr.map((task) => (task.id === id ? { ...task, isCompleted } : task)),
      );
    },
    [setTasks],
  );

  const deleteTask = useCallback(
    (id) => setTasks((curr) => curr.filter((task) => task.id !== id)),
    [setTasks],
  );

  const deleteAllTasks = () => {
    setTasks([]);
    setSearchQuery("");
  };

  return {
    tasks,
    setTasks,
    searchQuery,
    filteredTasks,
    completedTasks,
    newTaskFieldRef,
    addTask,
    setSearchQuery,
    toggleTaskCompleted,
    deleteTask,
    deleteAllTasks,
  };
};
