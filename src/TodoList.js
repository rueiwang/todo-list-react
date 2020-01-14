
import React, { Component } from 'react'
import TodoStatus from './TodoStatus'
import TodoItem from './TodoItem'

class TodoList extends Component {
    constructor (props) {
        super(props)
        this.state = {
            inputValue: '',
            list: [{
                name: '還有什麼事情沒做完呢?',
                id: '1233',
                isChecked: false
            }],
            cacheList: [{
                name: '還有什麼事情沒做完呢?',
                id: '1233',
                isChecked: false
            }],
            visibility: 'all'
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.addItem = this.addItem.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        this.doneItem = this.doneItem.bind(this)
        this.changeStatus = this.changeStatus.bind(this)
    }

    render () {
        return (
            <div className="wrap">
                <h1>To Do List</h1>
                <div className="todoStatus">
                    {this.getStatus()}
                </div>
                <p> {this.state.list.filter((item) => item.isChecked === false).length} items left </p>
                <ul className="itemList">
                    {this.getTodoItem()}
                </ul>
                <div className="input-area">
                    <input
                        className="inputItem"
                        placeholder="Add somthing ..."
                        type="text"
                        value={this.state.inputValue}
                        onChange={this.handleInputChange}
                    />
                    <button
                        onClick={this.addItem}><i className="fas fa-pencil-alt"></i></button>
                </div>
                <p className="date">{this.getDate()}</p>
            </div>
        )
    }

    getStatus () {
        return (
            <TodoStatus
                visibility = {this.state.visibility}
                changeStatus = {this.changeStatus}
            />
        )
    }

    getTodoItem () {
        return this.state.cacheList.map((item, index) => {
            return (
                <TodoItem
                    key = {item.id}
                    item = {item}
                    index = {item.id}
                    deleteItem = {this.deleteItem}
                    doneItem = {this.doneItem}
                />
            )
        })
    }

    getDate () {
        const date = new Date()
        const yyyy = date.getFullYear()
        const MM = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))
        const dd = date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate()
        const today = yyyy + '/' + MM + '/' + dd
        return today
    }

    changeStatus (status) {
        const doneList = this.state.list.filter((item) => item.isChecked === true)
        const pendingList = this.state.list.filter((item) => item.isChecked === false)
        if (status === 'all') {
            this.setState((state) => {
                return {
                    visibility: status,
                    cacheList: this.state.list
                }
            })
        } else if (status === 'pending') {
            this.setState((state) => {
                return {
                    visibility: status,
                    cacheList: pendingList
                }
            })
        } else if (status === 'done') {
            this.setState((state) => {
                return {
                    visibility: status,
                    cacheList: doneList
                }
            })
        }
    }

    handleInputChange (e) {
        this.setState({
            inputValue: e.target.value
        })
    }

    addItem () {
        const newItem = {
            name: this.state.inputValue,
            id: Date.now(),
            isChecked: false
        }
        this.setState((state) => {
            // 複製原本的加入新的
            return {
                list: [...state.list, newItem],
                inputValue: ''
            }
        })
        this.setState((state) => {
            return {
                cacheList: [...state.list]
            }
        })
    }

    doneItem (index, boolean) {
        console.log(index)
        const updateItemIndex = this.state.list.findIndex((item) => item.id === index)
        this.setState((state) => {
            state.list[updateItemIndex].isChecked = boolean
            return {
                list: [...state.list]
            }
        })
    }

    deleteItem (index) {
        const updateList = this.state.list.filter((item) => item.id !== index)
        console.log(index)
        this.setState((state) => {
            return {
                list: updateList,
                cacheList: updateList
            }
        })
    }
}

export default TodoList
