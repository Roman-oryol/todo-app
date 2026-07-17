import Field from './Field';

const SearchTaskForm = ({ onSearchInput }) => {
  return (
    <form className="todo__form" onSubmit={(event) => event.preventDefault()}>
      <Field
        className="todo__field"
        id="search-task"
        type="search"
        label="Поиск задачи"
        onInput={(event) => onSearchInput(event.target.value)}
      />
    </form>
  );
};

export default SearchTaskForm;
