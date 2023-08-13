import { useState, SetStateAction, memo, useCallback, useMemo } from 'react'
import styles from './style.module.scss'
import { useTranslation } from 'react-i18next'

type TodosItemProps = {
  id: number
  completed: boolean
  title: string
  userId: 1
}

function Todos() {
  const { t } = useTranslation()

  const [todos, setTodos] = useState([])
  const [text, setText] = useState('')

  const onClick = useCallback(
    (id: number) => {
      const result: any = todos.map((item: TodosItemProps) => {
        if (item.id === id) {
          item.completed = !item.completed
        }
        return item
      })
      setTodos(result)
    },
    [todos],
  )

  const onDelete = useCallback(
    (id: number) => {
      const result = todos.filter((item: TodosItemProps) => item.id !== id)
      setTodos(result)
    },
    [todos],
  )

  const onChange = useCallback((e: { target: { value: SetStateAction<string> } }) => {
    setText(e.target.value)
  }, [])

  const onCreate = useCallback(
    (e: { preventDefault: () => void }) => {
      e.preventDefault()
      const newTodo: TodosItemProps = {
        id: todos.length + 1,
        title: text,
        completed: false,
        userId: 1,
      }
      const result: any = [...todos, newTodo]
      setTodos(result)
    },
    [text, todos],
  )

  const render = useMemo(
    () =>
      todos.map((item: TodosItemProps) => {
        return (
          <div key={item.id}>
            <span>
              # {item.id} / {item.title} /
              <span onClick={() => onClick(item.id)}>{item.completed ? '✅' : '[TODO]'}</span>
              <span onClick={() => onDelete(item.id)}>🗑️</span>
            </span>
          </div>
        )
      }),
    [onClick, onDelete, todos],
  )

  return (
    <>
      {' '}
      <div className={styles.title}>{t('todos:title')}</div>
      <form onSubmit={onCreate}>
        <input
          type="text"
          value={text}
          onChange={onChange}
          placeholder={t('todos:itemPlaceholder')}
        />
        <input type="submit" value="Enter"></input>
      </form>
      <div>{render}</div>
    </>
  )
}

export default memo(Todos)
