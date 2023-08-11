import styles from "./style.module.scss"
import { memo } from "react"
import { useTranslation } from "react-i18next"
import Button from "@mui/material/Button"

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
      <Button onClick={() => setCount(count + 1)} variant="outlined">
        +
      </Button>
      <Button onClick={() => setCount(count - 1)} variant="outlined">
        -
      </Button>
    </>
  )
}

export default memo(Counter)
