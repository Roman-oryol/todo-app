import Router from "./Router";
import TaskPage from "./pages/TaskPage";
import TasksPage from "./pages/TasksPage";

function App() {
  const routes = {
    "/": TasksPage,
    "/tasks/:id": TaskPage,
    "*": () => <div>400 Page not found</div>,
  };

  return <Router routes={routes} />;
}

export default App;
