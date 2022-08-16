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
      <todoForm/>
      </div>
    );
  }
}

export default App ;
export createTodo, deleteTodo, toggleCompleted, filterTodos;

