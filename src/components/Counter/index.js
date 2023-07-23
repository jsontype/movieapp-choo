import styles from "./style.module.scss"

export default function Counter({ count, setCount }) {
  return (
    <>
      <div className={styles.title}>카운터 앱</div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </>
  )
}
