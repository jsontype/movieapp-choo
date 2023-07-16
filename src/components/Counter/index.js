import { useState } from "react"
import "./style.css"

export default function Counter() {
  // JS
  const [count, setCount] = useState(0)

  // XML
  return (
    <>
      <div className="title">카운터 앱</div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </>
  )
}
