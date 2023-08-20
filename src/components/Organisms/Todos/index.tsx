import { useState, SetStateAction, memo, useCallback, useMemo } from 'react'
import styles from './style.module.scss'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
// MUI
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

type TodosProps = {
  todos: TodosItemProps[]
  onCreate: (title: string) => { type: string }
  onCompleted: (id: number) => { type: string }
  onDelete: (id: number) => { type: string }
}

type TodosItemProps = {
  id: number
  completed: boolean
  title: string
  userId: 1
}

function Todos({ todos, onCreate, onCompleted, onDelete }: TodosProps) {
  const { t } = useTranslation()

  const [currentPage, setCurrentPage] = useState(1)
  const [input, setInput] = useState('')

  const count = useSelector(
    // Global State를 조회할 때에는 state의 타입을 RootState로 지정해야 한다.
    (state: any) => state.counter.count,
  )

  // 페이지가 변경될 때 실행되는 함수
  const onPageChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
  }

  const onSubmit = useCallback(
    (e: { preventDefault: () => void }) => {
      e.preventDefault()
      onCreate(input)
      setInput('')
    },
    [input, setInput, onCreate],
  )

  const onChange = useCallback(
    (e: { target: { value: SetStateAction<string> } }) => {
      setInput(e.target.value)
    },
    [setInput],
  )

  // 현재 페이지에 해당하는 게시물만 렌더링
  const startIndex = (currentPage - 1) * count
  const endIndex = startIndex + count
  const currentTodos = todos.slice(startIndex, endIndex)

  const render = useMemo(
    () =>
      currentTodos.map((item: TodosItemProps) => {
        return (
          <div key={item.id}>
            <span>
              # {item.id} / {item.title} /
              <span onClick={() => onCompleted(item.id)}>{item.completed ? '✅' : '[TODO]'}</span>
              <span onClick={() => onDelete(item.id)}>🗑️</span>
            </span>
          </div>
        )
      }),
    [onCompleted, onDelete, currentTodos],
  )

  return (
    <>
      {' '}
      <div className={styles.title}>{t('todos:title')}</div>
      <form onSubmit={onSubmit}>
        <input
          name="todo"
          type="text"
          value={input}
          onChange={onChange}
          placeholder={t('todos:itemPlaceholder')}
        />
        <input type="submit" value="Enter"></input>
      </form>
      <div>{render}</div>
      <Stack spacing={2} className={styles.pagination}>
        <Pagination
          count={Math.ceil(todos.length / count)}
          page={currentPage}
          onChange={onPageChange}
        />
      </Stack>
      <h6>페이지 당 게시물 수: {count}</h6>
    </>
  )
}

export default memo(Todos)
