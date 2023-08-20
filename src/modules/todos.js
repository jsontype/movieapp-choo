// 액션 타입
const ADD_TODO = 'todos/ADD_TODO'
const TOGGLE_TODO = 'todos/TOGGLE_TODO'
const DELETE_TODO = 'todos/DELETE_TODO'

// 액션 생성 함수
let key = 1 // todo 데이터에서 사용할 고유 id

export const addTodo = title => ({
  type: ADD_TODO,
  todo: {
    id: key++,
    title,
    completed: false,
    userId: 1,
  },
})

export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  id,
})

export const deleteTodo = id => ({
  type: DELETE_TODO,
  id,
})

// 초기값
const initialState = []

// 리듀서 함수
export default function todos(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.todo]
    case TOGGLE_TODO:
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo,
      )
    case DELETE_TODO:
      return state.filter(todo => todo.id !== action.id)
    default:
      return state
  }
}
