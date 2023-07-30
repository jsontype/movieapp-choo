import React, { useState } from "react"
import Movies from "./components/Movies"
import Todos from "./components/Todos"
import News from "./components/News"
import Counter from "./components/Counter"
import { Routes, Route, Link } from "react-router-dom"
import styles from "./App.module.scss"
import i18n from "i18next"

export default function App() {
  const [count, setCount] = useState(0)

  const onChangeLng = (lng: string) => {
    lng === "ja"
      ? i18n.changeLanguage("ja")
      : lng === "en"
      ? i18n.changeLanguage("en")
      : i18n.changeLanguage("ko")
  }

  return (
    <div className={styles.App}>
      <div>
        <span className={styles.logo}>General App</span>
        <Link to="/movies" className={styles.menu}>
          Movies
        </Link>
        <Link to="/todos" className={styles.menu}>
          Todos
        </Link>
        <Link to="/news" className={styles.menu}>
          News
        </Link>
        <Link to="/counter" className={styles.menu}>
          Counter
        </Link>

        <button onClick={() => onChangeLng("ko")}>ko</button>
        <button onClick={() => onChangeLng("en")}>en</button>
        <button onClick={() => onChangeLng("ja")}>ja</button>
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
