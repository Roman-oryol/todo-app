import TodoApp from "./components/TodoApp";
import { TaskProvider } from "./context/TaskProvider";

function App() {
  return (
    <TaskProvider>
      <TodoApp />
    </TaskProvider>
  );
}

export default App;
