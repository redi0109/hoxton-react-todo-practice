import { useEffect, useState } from "react";
import "./App.css";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:3333/todos")
      .then((resp) => resp.json())
      .then((todosFromServer) => setTodos(todosFromServer));
  }, []);





  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo List</h1>
        <input type="text" placeholder="Search Todo"
          onChange={(event)=>{
            setContent(event.target.value)
            searchTodo()
          }} />
      </header>
      <main className="App-main">
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className={todo.completed ? "completed" : "not-completed"}>
              {todo.title}
            </li>
          ))}
           

        
        </ul>

        <form>
          <input type="text" placeholder="Add Todo" />
        </form>
      </main>
    </div>
  );
}

export default App;
