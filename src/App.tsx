import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import "./App.css";

type Todo = {
  map: any;
  filter: any;
  length: number;
  id: number;
  title: string;
  completed: boolean;
};

function App() {
  const [todos, setTodos] = useState([]);
  const [search, setSearchTodo] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/todos")
      .then((response) => response.json())
      .then((todosFromServer) => setTodos(todosFromServer));
  }, []);

  function createTodo(title: string) {
    fetch("http://localhost:4000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    })
      .then((response) => response.json())
      .then((todo) => {
       setTodos([...todos, todo]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deleteTodo(id: number) {
    fetch(`http://localhost:4000/todos/${id}`, {
      method: "DELETE",
    }).then((response) => response.json());
    let newTodos = structuredClone(todos);
    newTodos = newTodos.filter((todo: { id: number }) => todo.id !== id);
    setTodos(newTodos);
  }

  function toggleCompleted(id: number) {
    let newTodos = structuredClone(todos);
    newTodos.forEach((todo: { id: number; completed: boolean }) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
    });

    function filterTodos(search: string) {
      let newTodos = structuredClone(todos);
      newTodos = newTodos.filter((todo: { title: string }) => {
        return todo.title.includes(search);
      });
    }

    return (
      <div className="App">
        <form
          className="todo-form"
          onSubmit={(event) => {
            event.preventDefault();
            createTodo(event.target.todo.value);
          }}
        >
          <h1>Todo App</h1>
          <div className="form-header">
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
      </div>
    );
  }
}

export default App;
