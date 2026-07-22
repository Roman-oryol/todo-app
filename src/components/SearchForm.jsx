import { Search } from "lucide-react";
import Form from "./Form";
import FormField from "./FormField";

const SearchForm = ({ searchQuery, onSearchChange, isEmptyTasks }) => {
  return (
    <Form>
      <FormField
        className={`pr-4 focus:border-blue-400 ${isEmptyTasks && "opacity-40"}`}
        type="search"
        label="Поиск задачи"
        icon={<Search size={16} />}
        value={searchQuery}
        onFormFieldInput={(e) => onSearchChange(e.target.value)}
        isEmptyTasks={isEmptyTasks}
      />
    </Form>
  );
};

export default SearchForm;
