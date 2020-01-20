import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import TodoList, { reducer } from './TodoList'
import './style.css'

const store = createStore(reducer)
ReactDOM.render(
    <Provider store={store}>
        <TodoList />
    </Provider>
    , document.getElementById('root'))
