import React, { Component } from 'react'
import { render } from 'react-dom'
import Store from '../stores/todos'
import TodoAction from '../actions/action'

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
          todos: Store.getTodos()
        } 
        this.onPressEnter = this.onPressEnter.bind(this)
    }

    componentDidMount(){
      Store.addListener('changed', (payload)=>{
        this.setState({
          todos: payload
        })
      })
      TodoAction.getAll()
    }

    onPressEnter(ev){
      if (ev.key ==='Enter')
        TodoAction.add(ev.target.value)
    }

    render(){
      return (
        <div>
            <input type="text" onKeyPress={ this.onPressEnter } />
            <ul>
              {
                this.state.todos.map((todo) => {
                  return <li key={todo.id}>{ todo.todo }</li>
                })
              }
            </ul>
        </div>
      )
    }
}

render(<App/>, document.getElementById('app'))
