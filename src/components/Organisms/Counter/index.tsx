import styles from "./style.module.scss"
import { memo } from "react"
import { useTranslation } from "react-i18next"

type CounterProps = {
  count: number
  setCount: (count: number) => void
}

function Counter({ count, setCount }: CounterProps) {
  const { t } = useTranslation()

  return (
    <>
      <div className={styles.title}>{t("counter:title")}</div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </>
  )
}

export default memo(Counter)
