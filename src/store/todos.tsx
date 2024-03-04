import { ReactNode, createContext, useContext, useEffect, useState } from "react";

export type TodosProviderProps = {
  children: ReactNode
}

export type Todo = {
  id: string,
  task: string,
  completed: boolean,
  createdAt: Date
}

export type TodoContext = {
  todos: Todo[],
  handleAddTodo: (task: string) => void,
  toggleTodoAsCompleted: (id: string) => void,
  deleteTodo: (id: string) => void
}

const todoContext = createContext<TodoContext | null>(null)

export const TodosProvider = ({ children }: TodosProviderProps) => {
  const [todos, setTodo] = useState<Todo[]>([]);

  useEffect(() => {
    if (!todos.length) {
      setTodo(() => {
        try {
          const newTodos = localStorage.getItem('todos') || "[]"
          return JSON.parse(newTodos) as Todo[]
        } catch (error) {
          return []
        }
      })
    }
  }, [todos])

  const handleAddTodo = (task: string) => {
    setTodo((prev) => {
      const newTodos: Todo[] = [
        {
          id: Math.random().toString(),
          task: task,
          completed: false,
          createdAt: new Date()
        },
        ...prev
      ]
      localStorage.setItem('todos', JSON.stringify(newTodos))
      return newTodos
    })
  }

  const toggleTodoAsCompleted = (id: string) => {
    setTodo((prev) => {
      const newTodos = prev.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed
          }
        } else {
          return todo
        }
      })
      localStorage.setItem('todos', JSON.stringify(newTodos))
      return newTodos
    })
  }

  const deleteTodo = (id: string) => {
    setTodo((prev) => {
      const newTodos = prev.filter(todo => todo.id !== id)
      localStorage.setItem('todos', JSON.stringify(newTodos))
      return newTodos
    })
  }

  return (
    <todoContext.Provider value={{ todos, handleAddTodo, toggleTodoAsCompleted, deleteTodo }} >
      {children}
    </todoContext.Provider>
  )
}

export const useTodos = () => {
  const todosConsumer = useContext(todoContext)
  if (!todosConsumer) {
    throw new Error('useTodos use outside of Provider.')
  }
  return todosConsumer
}

