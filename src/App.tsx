import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import TaskItem from './components/TaskItem'
import type { Task } from './types'
import './App.css'

const STORAGE_KEY = 'task-board:tasks'

function loadTasks(): Task[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? (JSON.parse(stored) as Task[]) : []
  } catch {
    return []
  }
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks)
  const [inputText, setInputText] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

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
