import { useEffect } from 'react'

function Todo() {
  useEffect(() => {
    import('../litComponents/todo-list')
  }, []);

  return (
    <div>
      <todo-list></todo-list>
    </div>
  )
}

export default Todo;
