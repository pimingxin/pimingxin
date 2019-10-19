import { createStore } from 'redux'
import { produce } from 'immer'

var state = {
  showing:'all',
  todos:[{
    content:'n',
    done:false
  },{
    content:'m',
    done:true
  }]
}


var mutations = {
  addTodo:produce((state,action) => {
      state.todos.push({
        content:action.todoText
      })
    }),
  

  deleteTodo:produce((state,action) => {
      state.todos.splice(action.idx,1)
    }),
    toggleTodoStatus:produce((state,action) => {
      state.todos[action.idx].done = !state.todos[action.idx].done
    }),

  };

export default createStore((state,action) => {
  var mutation = mutations[action.type]
  if (mutation){
    return mutation(state,action)
  }else{
    return state
  }
},state)