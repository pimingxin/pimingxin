import React from 'react'
import { connect } from 'react-redux'
import TodoItem from './TodoItem'

function mapStateToProps(state){
  return {
    todos:state.todos
  }
}

function mapDispatchToProps(dispatch){
  return {}
}

function TodoList(props){
  return (
    <ul>
      {
        props.todos.map((todo,idx) => 
          <TodoItem key={todo.content} todo={todo} idx={idx} />
        )
      }
    </ul>
  )
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoList)