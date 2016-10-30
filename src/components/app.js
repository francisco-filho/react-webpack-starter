import React, { Component } from 'react'
import { render } from 'react-dom'
import Store from '../stores/todos'
import { default as Actions } from '../actions/action'

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
          todos: []
        } 
        this.onPressEnter = this.onPressEnter.bind(this)
        this.remove = this.remove.bind(this)
    }

    componentDidMount(){
      Store.addListener('changed', payload =>{
        this.setState({
          todos: payload
        })
      })
      Actions.getAll()
    }

    remove(todo){
      Actions.remove(todo)
    }

    done(todo){
      console.log('done ', todo)
      Actions.done(todo)
    }

    onPressEnter(ev){
      if (ev.key ==='Enter')
        Actions.add(ev.target.value)
    }

    render(){
      return (
        <div>
            <input type="text" onKeyPress={ this.onPressEnter } />
            <ul>
              {
                this.state.todos.map((todo) => {
                return <TodoItem key={todo.id} 
                  todo={todo} done={()=>this.done(todo)}
                  removeFn={()=> this.remove(todo)}/>
                })
              }
            </ul>
        </div>
      )
    }
}

class TodoItem extends Component {
  constructor(props){
    super(props)
  }
  shouldComponentUpdate(nextProps, nextState){
    console.log('shouldupdate',nextProps, this.props)
    return true;
  }
  componentWillReceiveProps(newProps){
    console.info('newProps', newProps)
  }
  render(){
        return <li >{ this.props.todo.todo }
          <span onClick={()=> this.props.done(this.props.todo)}>{ this.props.todo.done}</span>
          <button onClick={()=> this.props.removeFn(this.props.todo)}>Remove</button>
        </li>
  }
}

render(<App/>, document.getElementById('app'))
