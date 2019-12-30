<template>
  <div>
    <BaseInputText 
      v-model="newTodoText"
      placeholder="New todo"
      @keydown.enter="addTodo"
    />
    <ul v-if="todos.length">
      <TodoListItem 
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @remove="removeTodo"
      />
    </ul>
    <p v-else>
      Nothing left in the list. Add a new todo in the input above.
    </p>
  </div>
</template>

<script>

import BaseInputText from './BaseInputText.vue'
import TodoListItem from './TodoListItem.vue'

let nextTodoId = 1

export default {
  components:{
    BaseInputText,TodoListItem
  },
  data() {
    return {
      newTodoText:'',
      todos:[{
        id:nextTodoId++,
        text:'sleep'
      },{
        id:nextTodoId++,
        text:'drink'
      }]
    }
  },
  methods: {
    addTodo(){
      const trimText = this.newTodoText.trim()
      if (trimText){
        this.todos.push({
          id:nextTodoId++,
          text:trimText
        })
        this.newTodoText = ''
      }
    },
    removeTodo(idToRemove){
      this.todos = this.todos.filter(todo => {
        return todo.id !== idToRemove
      })
    },
    selectAll(){
      this.
    }
  },
}
</script>