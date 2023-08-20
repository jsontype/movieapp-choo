import styles from './style.module.scss'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'

type CounterProps = {
  count: number
  onIncrease: () => { type: string }
  onDecrease: () => { type: string }
}

function Counter({ count, onIncrease, onDecrease }: CounterProps) {
  const { t } = useTranslation()

  return (
    <>
      <div className={styles.title}>{t('counter:title')}</div>
      <div>페이지당 표시게시물 수 : {count}</div>
      <button onClick={onIncrease}>+</button>
      <button onClick={onDecrease}>-</button>
    </>
  )
}

export default memo(Counter)
