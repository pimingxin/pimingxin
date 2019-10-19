import React from 'react'
import { connect } from 'react-redux'

function TodoInput(props){
  return(
    <div>
      <input type="checkbox" checked={props.isAllCompleted} onChange={props.toggleAllStatus} />
      <input type="text" onKeyUp={props.addTodo} />
    </div>
  )
}

function mapStateToProps(state){
  return {
    isAllCompleted : state.todos.every(it => it.done)
  }
}

function mapDispatchToProps(dispatch){
  return {
    toggleAllStatus: () => dispatch({type:'toggleAllStatus'}),
    addTodo: (e) => {
      if (e.keyCode === 13 && e.target.value.trim()){
        dispatch({type:'addTodo',todoText: e.target.value.trim()})
        e.target.value = ''
      }
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(TodoInput)