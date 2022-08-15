import { useEffect } from "react";
import "./App.css";

function App() {

  useEffect (() => {
    fetch ("http://localhost:4000/")
      .then (response => response.json ())
      .then (todo =>    (todo));
  } , []);
  return (
    <div className="App">
      <h1>Todo App</h1>
      <form className="todo-form">
        <div>
        <input className="add-todo" type="text" placeholder="Add Todo" />
        <button className="submit-btn" type="submit">
          Add
        </button>
        <button className="clear-btn" type="submit">
          Clear
        </button>
        <input className="search-todo" type="text" placeholder="Search Todo" />
        </div>
        <ul>
          <li>
            <input type="checkbox" />
            <span>Buy Milk</span>
            <button className="delete-btn">Delete</button>
          </li>
          <li>
            <input type="checkbox" />
            <span>Buy Eggs</span>
            <button className="delete-btn">Delete</button>
          </li>
          <li>
            <input type="checkbox" />
            <span>Buy Bread</span>
            <button className="delete-btn">Delete</button>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default App;
