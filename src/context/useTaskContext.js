import { useContext } from "react";
import { TaskContext } from "./TaskContext";

export const useTaskContext = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTaskContext должен использоваться внутри TaskProvider");
  }

  return context;
};
