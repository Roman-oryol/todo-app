import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import tasksAPI from "../api/tasksAPI";

const actions = {
  setAll: "SET_ALL",
  add: "Add",
  delete: "DELETE",
  deleteAll: "DELETE_ALL",
  toggleComplete: "TOGGLE_COMPLETE",
};

const tasksReducer = (state, action) => {
  switch (action.type) {
    case actions.setAll: {
      return Array.isArray(action.tasks) ? action.tasks : state;
    }

    case actions.add: {
      return [...state, action.task];
    }

    case actions.delete: {
      return state.filter((task) => task.id !== action.id);
    }

    case actions.deleteAll: {
      return [];
    }

    case actions.toggleComplete: {
      const { id, isCompleted } = action;

      return state.map((task) => {
        return task.id === id ? { ...task, isCompleted } : task;
      });
    }

    default:
      return state;
  }
};

export const useTasks = () => {
  const [tasks, dispatch] = useReducer(tasksReducer, []);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const newTaskFieldRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    newTaskFieldRef.current?.focus();

    const fetchTasks = async () => {
      try {
        const data = await tasksAPI.getAll(controller.signal);
        dispatch({ type: actions.setAll, tasks: data });
        setIsLoading(false);
      } catch (error) {
        if (error.name === "AbortError") return;
        console.error("Failed to fetch tasks:", error);
        setIsLoading(false);
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

  const addTask = useCallback(async (title) => {
    const newTask = { title, isCompleted: false };

    try {
      const addedTask = await tasksAPI.add(newTask);
      dispatch({ type: actions.add, task: addedTask });
      newTaskFieldRef.current?.focus();
      setSearchQuery("");
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  }, []);

  const toggleTaskCompleted = useCallback(async (id, isCompleted) => {
    try {
      const toggledTask = await tasksAPI.toggleComplete(id, isCompleted);
      dispatch({
        type: actions.toggleComplete,
        id: toggledTask.id,
        isCompleted: toggledTask.isCompleted,
      });
    } catch (error) {
      console.error("Failed to toggle task:", error);
    }
  }, []);

  const deleteTask = useCallback(async (id) => {
    try {
      await tasksAPI.delete(id);
      dispatch({ type: actions.delete, id });
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  }, []);

  const deleteAllTasks = useCallback(async () => {
    const { deletedIds, failedCount } = await tasksAPI.deleteAll(tasks);

    if (deletedIds.length > 0) {
      dispatch({ type: actions.deleteAll });
    }

    if (failedCount > 0) {
      console.error(`Failed to delete ${failedCount} task(s)`);
    }

    setSearchQuery("");
  }, [tasks]);

  return useMemo(
    () => ({
      tasks,
      isLoading,
      searchQuery,
      filteredTasks,
      completedTasks,
      newTaskFieldRef,
      addTask,
      setSearchQuery,
      toggleTaskCompleted,
      deleteTask,
      deleteAllTasks,
    }),
    [
      tasks,
      isLoading,
      searchQuery,
      filteredTasks,
      completedTasks,
      newTaskFieldRef,
      addTask,
      setSearchQuery,
      toggleTaskCompleted,
      deleteTask,
      deleteAllTasks,
    ],
  );
};
