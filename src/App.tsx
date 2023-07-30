import React, { useState } from "react"
import Movies from "./components/Movies"
import Todos from "./components/Todos"
import News from "./components/News"
import Counter from "./components/Counter"
import { Routes, Route, Link } from "react-router-dom"
import styles from "./App.module.scss"

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <div className={styles.App}>
      <div>
        <span className={styles.logo}>General App</span>
        <Link to="/movies" className="menu">
          Movies
        </Link>
        <Link to="/todos" className="menu">
          Todos
        </Link>
        <Link to="/news" className="menu">
          News
        </Link>
        <Link to="/counter" className="menu">
          Counter
        </Link>
      </div>

      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/news" element={<News />} />
        <Route
          path="/counter"
          element={<Counter count={count} setCount={setCount} />}
        />
      </Routes>
    </div>
  )
}
