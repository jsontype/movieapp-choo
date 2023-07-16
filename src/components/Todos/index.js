import React, { useState, useEffect } from "react"
import "./style.css"

export default function Todos() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((json) => {
        const result = json.filter((item) => item.userId === 1)
        setTodos(result)
      })
  }, [])

  const render = todos.map((item) => {
    return (
      <div key={item.id}>
        <div>
          # {item.id} / {item.title}
        </div>
      </div>
    )
  })

  return (
    <div>
      <div className="title">투두 앱</div>
      <div>{render}</div>
    </div>
  )
}
