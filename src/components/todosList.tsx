import { useSearchParams } from 'react-router-dom';
import { Todo, useTodos } from '../store/todos';
import { useMemo } from 'react';

const TodosList = () => {
  const [searchParams] = useSearchParams();
  const todoNav = searchParams.get('todo')
  const { todos, toggleTodoAsCompleted, deleteTodo } = useTodos();

  const filterTodo = useMemo(() => {
    let newList = todos;
    if (todoNav === 'active') {
      newList = todos.filter(todo => !todo.completed)
    }
    if (todoNav === 'completed') {
      newList = todos.filter(todo => todo.completed)
    }
    return newList
  }, [todos, todoNav])

  return (
    <div>
      <ul className="main-task">
        {filterTodo.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" id={`todo-${todo.id}`} checked={todo.completed} onChange={() => toggleTodoAsCompleted(todo.id)} />
            <label htmlFor={`todo-${todo.id}`}>{todo.task}</label>
            {todo.completed && <button type='button' onClick={() => deleteTodo(todo.id)}>Delete</button>}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodosList