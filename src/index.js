import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import i18n from './i18n'

// CPR 임포트
import rootReducer from 'modules'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

// Store 생성
const store = createStore(rootReducer)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // 프로바이더로 감싸기
  <Provider store={store}>
    <BrowserRouter>
      <App i18n={i18n} />
    </BrowserRouter>
  </Provider>,
)
