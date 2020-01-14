
import React, { Component, Fragment } from 'react'
import TodoStatus from './TodoStatus'
import TodoItem from './TodoItem'

class TodoList extends Component {
    constructor (props) {
        super(props)
        this.state = {
            inputValue: '',
            list: [],
            cacheList: [{
                name: '測試',
                id: '12',
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
            <Fragment>
                <div className="todoStatus">
                    {this.getStatus()}
                </div>
                <ul className="itemList">
                    {this.getTodoItem()}
                </ul>
                <div>
                    <input
                        className="inputItem"
                        type="text"
                        value={this.state.inputValue}
                        onChange={this.handleInputChange}
                    />
                    <button
                        onClick={this.addItem}>新增</button>
                </div>
            </Fragment>
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

    changeStatus (status) {
        this.setState((state) => {
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
        })
    }

    showItems () {
        const doneList = this.state.cacheList.filter((item) => item.isChecked === true)
        const pendingList = this.state.cacheList.filter((item) => item.isChecked === false)
        if (this.state.visibility === 'all') {
            this.setState((state) => {
                return {
                    cacheList: this.state.list
                }
            })
        } else if (this.state.visibility === 'pending') {
            this.setState((state) => {
                return {
                    cacheList: pendingList
                }
            })
        } else if (this.state.visibility === 'done') {
            this.setState((state) => {
                return {
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
                list: updateList
            }
        })
    }
}

export default TodoList
