import React, { useState } from "react"
import Movies from "./components/Movies"
import Todos from "./components/Todos"
import News from "./components/News"
import Counter from "./components/Counter"
import "./App.scss"

export default function App() {
  const [menu, setMenu] = useState("movies")
  const [count, setCount] = useState(0)

  const onClickMenu = (text: string) => {
    setMenu(text)
  }

  return (
    <div className="app">
      <div>
        <span className="logo">General App</span>
        <span
          className="menu"
          onClick={() => {
            onClickMenu("movies")
          }}
        >
          Movies
        </span>
        <span
          className="menu"
          onClick={() => {
            onClickMenu("todos")
          }}
        >
          Todos
        </span>
        <span
          className="menu"
          onClick={() => {
            onClickMenu("counter")
          }}
        >
          Counter
        </span>
        <span
          className="menu"
          onClick={() => {
            onClickMenu("news")
          }}
        >
          News
        </span>
      </div>
      {menu === "movies" && <Movies />}
      {menu === "todos" && <Todos />}
      {menu === "news" && <News />}
      {menu === "counter" && <Counter count={count} setCount={setCount} />}
    </div>
  )
}
