import Router from "./router/Router";
import TodoApp from "./components/TodoApp";
import TaskPage from "./pages/TaskPage";
import TasksPage from "./pages/TasksPage";
import { TaskProvider } from "./context/TaskProvider";

function App() {
  const routes = {
    "/": TasksPage,
    "/tasks/:id": TaskPage,
    "*": () => <div>400 Page not found</div>,
  };

  return (
    <TodoApp>
      <TaskProvider>
        <Router routes={routes} />
      </TaskProvider>
    </TodoApp>
  );
}

export default App;
