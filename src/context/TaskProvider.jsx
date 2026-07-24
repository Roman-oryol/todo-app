import { TaskContext } from "./TaskContext";
import { useTasks } from "../hooks/useTasks";
import { useIncompleteTaskScroll } from "../hooks/useIncompleteTaskScroll";

export const TaskProvider = ({ children }) => {
  // const [tasks, setTasks] = useState(() => {
  //   const savedTasks = localStorage.getItem("tasks");

  //   if (savedTasks) {
  //     return JSON.parse(savedTasks);
  //   }

  //   return [
  //     {
  //       id: crypto.randomUUID(),
  //       title: "Купить молоко, очень, очень, очень много молока",
  //       isCompleted: false,
  //     },
  //     {
  //       id: crypto.randomUUID(),
  //       title: "Убраться в квартире",
  //       isCompleted: true,
  //     },
  //   ];
  // });
  // const [searchQuery, setSearchQuery] = useState("");
  // const [highlightedTaskId, setHighlightedTaskId] = useState(null);

  // const newTaskFieldRef = useRef(null);

  // const firstIncompleteTaskRef = useRef(null);
  // const firstIncompleteTaskId = tasks.find(
  //   ({ isCompleted }) => !isCompleted,
  // )?.id;

  // useEffect(() => {
  //   localStorage.setItem("tasks", JSON.stringify(tasks));
  // }, [tasks]);

  // useEffect(() => {
  //   newTaskFieldRef.current.focus();
  // }, []);

  // const filteredTasks = searchQuery.trim()
  //   ? tasks.filter((task) =>
  //       task.title.toLowerCase().includes(searchQuery.toLowerCase()),
  //     )
  //   : null;

  // const addTask = (title) => {
  //   setTasks((curr) => [
  //     ...curr,
  //     {
  //       id: crypto.randomUUID(),
  //       title,
  //       isCompleted: false,
  //     },
  //   ]);
  //   newTaskFieldRef.current.focus();
  //   setSearchQuery("");
  // };

  // const completedTasks = tasks.reduce(
  //   (acc, task) => (task.isCompleted ? acc + 1 : acc),
  //   0,
  // );

  // const toggleTaskCompleted = useCallback((id, isCompleted) => {
  //   setTasks((prevTasks) =>
  //     prevTasks.map((task) =>
  //       task.id === id ? { ...task, isCompleted } : task,
  //     ),
  //   );
  // }, []);

  // const deleteAllTasks = () => {
  //   setTasks([]);
  //   setSearchQuery("");
  // };

  // const deleteTask = useCallback((id) => {
  //   setTasks((curr) => curr.filter((task) => task.id !== id));
  // }, []);

  // const scrollToFirstIncomplete = () => {
  //   if (!firstIncompleteTaskId) return;

  //   firstIncompleteTaskRef.current?.scrollIntoView({
  //     behavior: "smooth",
  //     block: "center",
  //   });

  //   setHighlightedTaskId(firstIncompleteTaskId);
  //   setTimeout(() => setHighlightedTaskId(null), 1200);
  // };

  // const value = {
  //   tasks,
  //   newTaskFieldRef,
  //   highlightedTaskId,
  //   filteredTasks,
  //   completedTasks,
  //   searchQuery,
  //   firstIncompleteTaskRef,
  //   firstIncompleteTaskId,
  //   setSearchQuery,
  //   setTasks,
  //   addTask,
  //   toggleTaskCompleted,
  //   deleteAllTasks,
  //   deleteTask,
  //   scrollToFirstIncomplete,
  // };

  const taskState = useTasks();
  const scrollState = useIncompleteTaskScroll(taskState.tasks);

  const value = { ...taskState, ...scrollState };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
