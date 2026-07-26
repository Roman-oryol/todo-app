import { useCallback, useEffect, useRef, useState } from "react";
import tasksAPI from "../api/tasksAPI";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const newTaskFieldRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    newTaskFieldRef.current?.focus();

    const fetchTasks = async () => {
      try {
        const data = await tasksAPI.getAll(controller.signal);
        setTasks(data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchTasks();

    return () => {
      controller.abort();
    };
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

  const addTask = async (title) => {
    const newTask = { title, isCompleted: false };

    try {
      const addedTask = await tasksAPI.add(newTask);
      setTasks((curr) => [...curr, addedTask]);
      newTaskFieldRef.current?.focus();
      setSearchQuery("");
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  const toggleTaskCompleted = useCallback(
    async (id, isCompleted) => {
      try {
        const toggledTask = await tasksAPI.toggleComplete(id, isCompleted);
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === id ? toggledTask : task)),
        );
      } catch (error) {
        console.error("Failed to toggle task:", error);
      }
    },
    [setTasks],
  );

  const deleteTask = useCallback(
    async (id) => {
      try {
        await tasksAPI.delete(id);
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      } catch (error) {
        console.error("Failed to delete task:", error);
      }
    },
    [setTasks],
  );

  const deleteAllTasks = async () => {
    const { deletedIds, failedCount } = await tasksAPI.deleteAll(tasks);

    if (deletedIds.length > 0) {
      setTasks((prevTasks) =>
        prevTasks.filter((task) => !deletedIds.includes(task.id)),
      );
    }

    if (failedCount > 0) {
      console.error(`Failed to delete ${failedCount} task(s)`);
    }

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
