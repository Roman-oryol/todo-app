import { useTask } from "../hooks/useTask";

const TaskPage = ({ params }) => {
  const { task, isLoading, hasError } = useTask(params.id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (hasError) {
    return <div>Задача не найдена</div>;
  }

  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.isCompleted ? "Задача выполнена" : "Задача не выполнена"}</p>
    </div>
  );
};

export default TaskPage;
