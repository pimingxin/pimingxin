import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import React from 'react';
import { Provider } from 'react-redux'

import store from './store'

export default function TodoApp(){
  return (
    <Provider store={store}>
      <div>
        <TodoInput />
        <TodoList />
      </div>
    </Provider>
  )
}