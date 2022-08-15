import './App.css'

function App() {


  return (
    <div className="App">
     <h1>Todo App</h1>
     <form className='todo-form'>
        <input className='add-todo' type="text" placeholder="Add Todo" />
        <button className='submit-btn' type="submit">Add</button>


     </form>
    </div>
  )
}

export default App
