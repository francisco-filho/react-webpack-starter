import { EventEmitter } from 'events'

let todos = []

let Store =  {
  getTodos(){
    return todos;
  },
  set(newTodos){
    todos = newTodos
    console.log('setting todos', todos)
    this.emit('changed', todos)
  }
}

Store = Object.assign({}, EventEmitter.prototype, Store)

export default Store
