import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { TaskContext } from './TaskContext';

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');

    if (savedTasks) {
      return JSON.parse(savedTasks);
    }

    return [
      { id: 'task-1', title: 'Купить молоко', isDone: false },
      { id: 'task-2', title: 'Погладить кота', isDone: true },
    ];
  });
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const newTaskInputRef = useRef(null);
  const firstIncompleteTaskRef = useRef(null);

  const firstIncompleteTaskId = tasks.find(({ isDone }) => !isDone)?.id;

  const deleteAllTasks = useCallback(() => {
    const isConfirmed = confirm('Вы уверены, что хотите удалить все задачи?');

    if (isConfirmed) {
      setTasks([]);
    }
  }, []);

  const deleteTask = useCallback((taskId) => {
    setTasks((tasks) => tasks.filter((task) => task.id !== taskId));
  }, []);

  const toggleTaskComplete = useCallback((taskId, isDone) => {
    setTasks((tasks) =>
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, isDone };
        }

        return task;
      })
    );
  }, []);

  const addTask = useCallback(() => {
    if (newTaskTitle.trim().length > 0) {
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: crypto.randomUUID(), title: newTaskTitle, isDone: false },
      ]);
      setNewTaskTitle('');
      setSearchQuery('');
      newTaskInputRef.current.focus();
    }
  }, [newTaskTitle]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    newTaskInputRef.current.focus();
  }, []);

  const filteredTasks = useMemo(() => {
    const clearSearchQuery = searchQuery.trim().toLowerCase();

    return clearSearchQuery.length > 0
      ? tasks.filter(({ title }) =>
          title.toLowerCase().includes(clearSearchQuery)
        )
      : null;
  }, [searchQuery, tasks]);
  return (
    <TaskContext.Provider
      value={{
        tasks,
        filteredTasks,
        firstIncompleteTaskRef,
        firstIncompleteTaskId,
        deleteTask,
        deleteAllTasks,
        toggleTaskComplete,
        newTaskTitle,
        setNewTaskTitle,
        searchQuery,
        setSearchQuery,
        newTaskInputRef,
        addTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
