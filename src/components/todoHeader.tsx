
export function todoHeader(setSearchTodo, filterTodos) {
  return (
    <div className="form-header">
      <h1>Todo App</h1>
      <div>
        <input className="add-todo" type="text" placeholder="Add Todo" />
        <button className="submit-btn" type="submit">
          Add
        </button>

        <button className="clear-btn" type="submit">
          Clear
        </button>
      </div>
      <input
        className="search-todo"
        type="text"
        placeholder="Search Todo"
        onChange={(event) => {
          setSearchTodo(event.target.value);
          filterTodos(search);
        }}
      />
    </div>
  );
}
