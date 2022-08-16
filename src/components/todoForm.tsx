import {todoHeader} from './todoHeader';


export function todoForm () {
    return(
        <form
        className="todo-form"
        onSubmit={(event) => {
          event.preventDefault();
          createTodo(event.target.todo.value);
        }}
      >
        <todoHeader 
        setSearchTodo = {setSearchTodo}
        filterTodos = {filterTodos} 
        />
    
        <ul>
          {todos.map((todo: Todo) => (
            <li>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => {
                  const updatedTodos = todos.map(
                    (todo: { id: any; completed: any }) => {
                      if (todo.id === todo.id) {
                        return { ...todo, completed: !todo.completed };
                      }
                      return todo;
                    }
                  );
                  setTodos(updatedTodos);
                }}
              />
              <span>{todo.title}</span>
              <button
                className="delete-btn"
                type="submit"
                onClick={() => {
                  deleteTodo(todo.id);
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </form>
    )
}