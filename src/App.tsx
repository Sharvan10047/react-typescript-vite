import AddTodoList from "./components/addTodoList"
import Navbar from "./components/navbar"
import TodosList from "./components/todosList"
import './App.css'


const App = () => {
  return (
    <main>
      <h2>TODO REACT + TYPESCRIPT + VITE</h2>
      <Navbar />
      <AddTodoList />
      <TodosList />
    </main>
  )
}

export default App