import "./style.css"

type CounterProps = {
  count: number
  setCount: (count: number) => void
}

export default function Counter({ count, setCount }: CounterProps) {
  return (
    <>
      <div className="title">카운터 앱</div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </>
  )
}
