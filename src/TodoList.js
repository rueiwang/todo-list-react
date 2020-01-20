/* eslint-disable no-case-declarations */
/* eslint-disable no-useless-constructor */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import TodoStatus from './TodoStatus'
import TodoItem from './TodoItem'
import {
    HANDLE_INPUT,
    ADD_ITEM,
    DELETE_ITEM,
    COMPLETE_ITEM,
    CHANGE_STATUS
} from './constants/ActionTypes'

import {
    handleInput,
    addItem,
    deleteItem,
    completeItem,
    changeStatus
} from './actions/TodoList'

const initState = {
    inputValue: '',
    list: [],
    visibility: 'all'
}

export const reducer = (state = initState, action) => {
    switch (action.type) {
    case HANDLE_INPUT:
        return {
            ...state,
            inputValue: action.payload.input
        }
    case ADD_ITEM:
        return {
            ...state,
            list: [...state.list, {
                name: state.inputValue,
                id: Date.now(),
                isChecked: false
            }],
            inputValue: ''
        }
    case DELETE_ITEM:
        return {
            ...state,
            list: state.list.filter((item) => item.id !== action.payload.index)
        }
    case COMPLETE_ITEM:
    {
        const targetIndex = state.list.findIndex((item) => item.id === action.payload.index)
        const newList = [...state.list]
        newList[targetIndex].isChecked = action.payload.isComplete
        return {
            ...state,
            list: newList
        }
    }
    case CHANGE_STATUS:
        return {
            ...state,
            visibility: action.payload.status
        }
    default:
        return state
    }
}

// connect arg
export const mapDispatchToProps = dispatch => {
    return {
        handleInput: (input) => dispatch(handleInput(input)),
        addItem: (index) => dispatch(addItem(index)),
        deleteItem: (index) => dispatch(deleteItem(index)),
        completeItem: (index, boolean) => dispatch(completeItem(index, boolean)),
        changeStatus: (status) => dispatch(changeStatus(status))
    }
}

const mapStateToProps = state => ({
    inputValue: state.inputValue,
    list: state.list,
    visibility: state.visibility
})

class ConnectTodoList extends Component {
    render () {
        return (
            <div className="wrap">
                <h1>To Do List</h1>
                <div className="todoStatus">
                    {this.getStatus()}
                </div>
                <p> {this.props.list.filter((item) => item.isChecked === false).length} items left </p>
                <ul className="itemList">
                    {this.getTodoItem()}
                </ul>
                <div className="input-area">
                    <input
                        className="inputItem"
                        placeholder="Add somthing ..."
                        type="text"
                        value={this.props.inputValue}
                        onChange={this.props.handleInput.bind(this)}
                    />
                    <button
                        onClick={this.props.addItem}><i className="fas fa-pencil-alt"></i></button>
                </div>
                <p className="date">{this.getDate()}</p>
            </div>
        )
    }

    getStatus () {
        return (
            <TodoStatus
                visibility = {this.props.visibility}
                changeStatus = {this.props.changeStatus}
            />
        )
    }

    getTodoItem () {
        let renderList
        if (this.props.visibility === 'all') {
            renderList = this.props.list
        } else if (this.props.visibility === 'pending') {
            renderList = this.props.list.filter((item) => item.isChecked === false)
        } else if (this.props.visibility === 'done') {
            renderList = this.props.list.filter((item) => item.isChecked === true)
        }
        return renderList.map((item, index) => {
            return (
                <TodoItem
                    key = {item.id}
                    item = {item}
                    index = {item.id}
                    list = {this.props.list}
                    deleteItem = {this.props.deleteItem}
                    completeItem = {this.props.completeItem}
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
}

const TodoList = connect(mapStateToProps, mapDispatchToProps)(ConnectTodoList)

export default TodoList
