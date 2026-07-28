import { useEffect, useState } from "react";
import tasksAPI from "../api/tasksAPI";

export const useTask = (taskId) => {
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchTask = async () => {
      setIsLoading(true);
      setHasError(false);

      try {
        const taskData = await tasksAPI.getById(taskId, controller.signal);
        setTask(taskData);
      } catch (error) {
        if (error.name === "AbortError") return;
        console.error("Failed to fetch task:", error);
        setHasError(true);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    fetchTask();

    return () => {
      controller.abort();
    };
  }, [taskId]);

  return { task, isLoading, hasError };
};
