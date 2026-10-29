import { useState } from 'react'
import './App.css'

type Todo = { id: number; text: string; done: boolean }

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [text, setText] = useState('')

  const add = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    setTodos((cur) => [{ id: Date.now(), text: trimmed, done: false }, ...cur])
    setText('')
  }

  const toggle = (id: number) =>
    setTodos((cur) =>
      cur.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    )

  const remove = (id: number) =>
    setTodos((cur) => cur.filter((t) => t.id !== id))

  const remaining = todos.filter((t) => !t.done).length

  return (
    <main className="app">
      <div className="todo">
        <h1 className="todo__title">Todo</h1>

        <form className="todo__form" onSubmit={add}>
          <input
            className="todo__input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What needs doing?"
            autoFocus
          />
          <button type="submit" className="todo__add">
            Add
          </button>
        </form>

        {todos.length === 0 ? (
          <p className="todo__empty">Nothing to do yet.</p>
        ) : (
          <ul className="todo__list">
            {todos.map((t) => (
              <li key={t.id} className={`todo__item${t.done ? ' is-done' : ''}`}>
                <label>
                  <input
                    type="checkbox"
                    checked={t.done}
                    onChange={() => toggle(t.id)}
                  />
                  <span>{t.text}</span>
                </label>
                <button
                  type="button"
                  className="todo__remove"
                  aria-label={`Delete ${t.text}`}
                  onClick={() => remove(t.id)}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}

        {todos.length > 0 && (
          <p className="todo__count">{remaining} left</p>
        )}
      </div>
    </main>
  )
}

export default App
