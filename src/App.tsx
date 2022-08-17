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

  function searchTodo (){
    let filteredTodos = todos.filter(todo => todo.title?.toLocaleLowerCase().includes(content?.toLocaleLowerCase()));
    return filteredTodos;
  }

 function toggleTodo(item:Todo){
  const newTodos = structuredClone(todos);
  const index = newTodos.findIndex((todo: { id: number; }) => todo.id === item.id);
  newTodos[index].completed = !newTodos[index].completed;
  setTodos(newTodos);
 }




  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo List</h1>
        <input type="text" placeholder="Search Todo"
        onChange={(event) => { setContent(event.target.value)
        searchTodo()}}/>
      </header>
      <main className="App-main">
        <ul className="todo-list">
          {searchTodo().map((item) => (
            <li key={item.id} className={item.completed ? "completed" : "not-completed"}
            onClick={()=>{
              toggleTodo(item)
              fetch(`http://localhost:3333/todos/${item.id}`,{
                method:'PATCH',
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  completed: !item.completed
                })
              })
            }
            }
            >
              {item.title}
            </li>
          ))}
           

        
        </ul>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            let newTodo = {
              content: event.target.newTodo.value,
              completed: false,
            };
            setTodos([...todos, newTodo]);
            fetch("http://localhost:4000/todos", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                content: event.target.newTodo.value,
                completed: false,
              }),
            });
            event.target.reset();
          }}
        >
          <input placeholder="add a todo" name="newTodo"></input>
          <button>Submit</button>
        </form>
      </main>
    </div>
  );
}

export default App;
