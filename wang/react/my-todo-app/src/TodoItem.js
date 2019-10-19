import {connect} from 'react-redux'
import React from 'react'

function TodoItem(props){
  return (
    <li>
       <input type="checkbox" checked={props.todo.done} onChange={() => props.toggleTodoStatus(props.idx)} />
       <span>{props.todo.content}</span>
       <button onClick={() => props.deleteTodo(props.idx)}>X</button>
    </li>
  )
}

function mapStateToProps(state){
  return {}
}
function mapDispatchToProps(dispatch){
  return {
    deleteTodo:(idx) => dispatch({type:'deleteTodo',idx}),
    toggleTodoStatus : (idx) => dispatch({type:'toggleTodoStatus',idx})
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(TodoItem)