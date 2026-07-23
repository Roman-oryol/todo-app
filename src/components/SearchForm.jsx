import { Search } from "lucide-react";
import Form from "./Form";
import FormField from "./FormField";
import { useTaskContext } from "../context/useTaskContext";

const SearchForm = () => {
  const { searchQuery, setSearchQuery, tasks } = useTaskContext();
  const isEmptyTasks = tasks.length === 0;

  return (
    <Form>
      <FormField
        className={`pr-4 focus:border-blue-400 ${isEmptyTasks && "opacity-40"}`}
        type="search"
        label="Поиск задачи"
        icon={<Search size={16} />}
        value={searchQuery}
        onFormFieldInput={(e) => setSearchQuery(e.target.value)}
        isEmptyTasks={isEmptyTasks}
      />
    </Form>
  );
};

export default SearchForm;
