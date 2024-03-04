import { Link, useSearchParams } from 'react-router-dom'

const Navbar = () => {
  const [searchParams] = useSearchParams();
  const todos̥Data = searchParams.get("todo");

  return (
    <nav>
      <Link to='/'className={todos̥Data === null ? "active" : ""}>All</Link>
      <Link to='/?todo=active'className={todos̥Data === 'active' ? "active" : ""}>Active</Link>
      <Link to='/?todo=completed'className={todos̥Data === 'completed' ? "active" : ""}>Completed</Link>
    </nav>
  )
}

export default Navbar