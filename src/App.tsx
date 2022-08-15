import { useEffect, useState } from "react";
import "./App.css";



function App() {
 const [todos, setTodos] = useState([]);

  useEffect (() => {
    fetch ("http://localhost:4000/todos")
      .then (response => response.json ())
      .then (todosFromServer => setTodos (todosFromServer));
  } , []);

  return (
    <div className="App">
      
      <form className="todo-form">
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
        <input className="search-todo" type="text" placeholder="Search Todo" />
        </div>
        <ul>
          {todos.map (todo => (

          <li>
            <input type="checkbox" />
            <span>{todo.title}</span>
            <button className="delete-btn">Delete</button>
          </li>
          ))}
   
        </ul>
      </form>
    </div>
  );
}

export default App;
