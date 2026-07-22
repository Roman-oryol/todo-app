import { useContext } from 'react';
import Field from './Field';
import { TaskContext } from '../context/TaskContext';

const SearchTaskForm = () => {
  const { searchQuery, setSearchQuery } = useContext(TaskContext);

  return (
    <form className="todo__form" onSubmit={(event) => event.preventDefault()}>
      <Field
        className="todo__field"
        id="search-task"
        type="search"
        label="Поиск задачи"
        value={searchQuery}
        onInput={(event) => setSearchQuery(event.target.value)}
      />
    </form>
  );
};

export default SearchTaskForm;
