import {
  useState,
  useEffect,
  SetStateAction,
  memo,
  useCallback,
  useMemo,
} from "react"
import styles from "./style.module.scss"
import { useTranslation } from "react-i18next"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

type TodosItemProps = {
  id: number
  completed: boolean
  title: string
  userId: 1
}

function Todos() {
  const { t } = useTranslation()

  const [todos, setTodos] = useState([])
  const [text, setText] = useState("")

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((json) => {
        const result = json.filter((item: TodosItemProps) => item.userId === 1)
        setTodos(result)
      })
  }, [])

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
    [todos]
  )

  const onDelete = useCallback(
    (id: number) => {
      const result = todos.filter((item: TodosItemProps) => item.id !== id)
      setTodos(result)
    },
    [todos]
  )

  const onChange = useCallback(
    (e: { target: { value: SetStateAction<string> } }) => {
      setText(e.target.value)
    },
    []
  )

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
    [text, todos]
  )

  const render = useMemo(
    () =>
      todos.map((item: TodosItemProps) => {
        return (
          <div key={item.id}>
            <span>
              # {item.id} / {item.title} /
              <span onClick={() => onClick(item.id)}>
                {item.completed ? "✅" : "[TODO]"}
              </span>
              <span onClick={() => onDelete(item.id)}>🗑️</span>
            </span>
          </div>
        )
      }),
    [onClick, onDelete, todos]
  )

  return (
    <>
      {" "}
      <div className={styles.title}>{t("todos:title")}</div>
      <form onSubmit={onCreate}>
        <TextField
          hiddenLabel
          id="filled-hidden-label-normal"
          defaultValue="Small"
          variant="filled"
          value={text}
          onChange={onChange}
          placeholder={t("todos:itemPlaceholder")}
          size="small"
          sx={{ width: "100%", maxWidth: "13em" }}
        />
        <Button type="submit" variant="contained" sx={{ height: "3em" }}>
          {t("todos:itemEnter")}
        </Button>
      </form>
      <div>{render}</div>
    </>
  )
}

export default memo(Todos)
