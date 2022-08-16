import { useEffect, useState } from "react";
import "./App.css";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

useEffect(() => {
  fetch("http://localhost:3333/todos")
    .then((resp) => resp.json())
    .then((todosFromServer) => setTodos(todosFromServer));
}, []);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo List</h1>
        <input type="text" placeholder="Search Todo" />
      </header>
      <main className="App-main">
        <ul className="todo-list">
          <li>Learn React</li>
          <li>Learn React</li>
          <li>Learn React</li>
        </ul>

        <form>
          <input type="text" placeholder="Add Todo" />
        </form>

      </main>

    </div>
  );
}

export default App;
