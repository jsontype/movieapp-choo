// 액션 타입
const INCREASE = 'counter/INCREASE'
const DECREASE = 'counter/DECREASE'

// 액션 생성함수
export const increase = () => ({ type: INCREASE })
export const decrease = () => ({ type: DECREASE })

// 초기값
const initialState = {
  count: 5,
}

// 리듀서
export default function counter(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return {
        count: state.count + 1,
      }
    case DECREASE:
      return {
        count: state.count - 1,
      }
    default:
      return state
  }
}
