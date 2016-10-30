import Store from '../stores/todos'

let todos = [
  { id: 1, todo: 'nothing', done: false},
  { id: 2, todo: 'react', done: false}
]

let TodoAction = {
  constructor(){
    console.info('new todo action')
    this.getAll()
  },

  add(text){
    todos.push({ id: todos.length + 1, todo: text, done: false}) 
    Store.set(todos)
  },

  done(todoId){
    todos = todos.map((t)=>{
      tmp = t; 
      if (tmp.id === todoId) tmp.done = true
      return tmp
    })
    Store.set(todos)
  },

  getAll(){
    console.log('todos in getall', todos)
    Store.set(todos)
  }
}

export default TodoAction
