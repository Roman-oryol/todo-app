import { useEffect, useRef, useState } from "react";
import SearchForm from "./SearchForm";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import TaskListSummary from "./TaskListSummary";

const TodoApp = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      return JSON.parse(savedTasks);
    }

    return [
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
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedTaskId, setHighlightedTaskId] = useState(null);

  const newTaskFieldRef = useRef(null);
  const firstIncompleteTaskRef = useRef(null);

  const firstIncompleteTaskId = tasks.find(
    ({ isCompleted }) => !isCompleted,
  )?.id;

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    newTaskFieldRef.current.focus();
  }, []);

  const filteredTasks = searchQuery.trim()
    ? tasks.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : null;

  const addTask = (title) => {
    setTasks((curr) => [
      ...curr,
      {
        id: crypto.randomUUID(),
        title,
        isCompleted: false,
      },
    ]);
    newTaskFieldRef.current.focus();
    setSearchQuery("");
  };

  const completedTasks = tasks.reduce(
    (acc, task) => (task.isCompleted ? acc + 1 : acc),
    0,
  );

  const toggleTaskCompleted = (id, isCompleted) => {
    setTasks((curr) =>
      curr.map((task) => (task.id === id ? { ...task, isCompleted } : task)),
    );
  };

  const deleteAllTasks = () => {
    setTasks([]);
    setSearchQuery("");
  };

  const deleteTask = (id) => [
    setTasks((curr) => curr.filter((task) => task.id !== id)),
  ];

  const scrollToFirstIncomplete = () => {
    if (!firstIncompleteTaskId) return;

    firstIncompleteTaskRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    setHighlightedTaskId(firstIncompleteTaskId);
    setTimeout(() => setHighlightedTaskId(null), 1200);
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-6">
        <div className="grid h-[80vh] w-full max-w-md content-start gap-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h1 className="text-center text-2xl font-bold text-zinc-300">
            Список задач
          </h1>
          <TaskForm addTask={addTask} newTaskFieldRef={newTaskFieldRef} />
          <SearchForm
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            isEmptyTasks={tasks.length === 0}
          />
          <TaskListSummary
            completedTasks={completedTasks}
            totalTasks={tasks.length}
            deleteAllTasks={deleteAllTasks}
            scrollToFirstIncomplete={scrollToFirstIncomplete}
            firstIncompleteTaskId={firstIncompleteTaskId}
          />
          <TaskList
            tasks={tasks}
            filteredTasks={filteredTasks}
            firstIncompleteTaskRef={firstIncompleteTaskRef}
            firstIncompleteTaskId={firstIncompleteTaskId}
            toggleTaskCompleted={toggleTaskCompleted}
            deleteTask={deleteTask}
            highlightedTaskId={highlightedTaskId}
          />
        </div>
      </div>
    </>
  );
};

export default TodoApp;
