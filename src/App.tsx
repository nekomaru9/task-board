import { useState } from 'react'
import type { FormEvent } from 'react'
import TaskItem from './components/TaskItem'
import type { Task } from './types'
import './App.css'

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [inputText, setInputText] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const text = inputText.trim()
    if (!text) return

    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text, completed: false },
    ])
    setInputText('')
  }

  const handleToggle = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  return (
    <div className="task-board">
      <h1>タスクボード</h1>

      <form className="task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="task-form__input"
          placeholder="新しいタスクを入力"
          value={inputText}
          onChange={(event) => setInputText(event.target.value)}
        />
        <button type="submit" className="task-form__submit">
          追加
        </button>
      </form>

      {tasks.length === 0 ? (
        <p className="task-board__empty">タスクはまだありません</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
