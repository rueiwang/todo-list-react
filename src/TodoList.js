/* eslint-disable no-labels */
/* eslint-disable no-unused-expressions */
import React, { Component, Fragment } from 'react'
import TodoItem from './TodoItem'

class TodoList extends Component {
    constructor (props) {
        super(props)
        this.state = {
            inputValue: '',
            list: []
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.addItem = this.addItem.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
    }

    render () {
        return (
            <Fragment>
                <div>
                    <input
                        type="text"
                        value={this.state.inputValue}
                        onChange={this.handleInputChange}
                    />
                    <button
                        onClick={this.addItem}>提交</button>
                </div>
                <ul>
                    {this.getTodoItem()}
                </ul>
            </Fragment>
        )
    }

    getTodoItem () {
        return this.state.list.map((item, index) => {
            return (
                <TodoItem
                    key = {index}
                    item = {item}
                    index = {index}
                    deleteItem = {this.deleteItem}
                />
            )
        })
    }

    handleInputChange (e) {
        console.log(e.target.value)
        this.setState({
            inputValue: e.target.value
        })
    }

    addItem () {
        this.setState({
            // 複製原本的加入新的
            list: [...this.state.list, this.state.inputValue],
            inputValue: ''
        })
    }

    deleteItem (index) {
        const list = [...this.state.list]
        list.splice(index, 1)

        this.setState({
            list: list
        })
    }
}

export default TodoList
