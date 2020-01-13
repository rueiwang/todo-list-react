import React from 'react'
import ReactDom from 'react-dom'
import './style.css'

class ShowItem extends React.Component {
  render () {
    return <ul className="todo-list">
      <li>第一項</li>
    </ul>
  }
}

class InputToDoItem extends React.Component {
  render () {
    return <form onSubmit={this.handleSubmit}>
      <label>
        <input type="text" value="代辦事項" />
      </label>
      <input type="submit" value="Submit" />
    </form>
  }
}

class ToDoList extends React.Component {
  render () {
    return <div className="todoWrap">
      <ShowItem />
      <InputToDoItem />
    </div>
  }
}
ReactDom.render(<ToDoList/>, document.querySelector('#root'))
