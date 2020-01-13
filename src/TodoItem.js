import React, { Component } from 'react'

class TodoItem extends Component {
    constructor (props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    render () {
        // eslint-disable-next-line react/prop-types
        const { item } = this.props
        return (
            <li>
                <span>{item}</span>
                <button
                    onClick={this.handleClick}>刪除</button>
            </li>
        )
    }

    handleClick () {
        // eslint-disable-next-line react/prop-types
        const { deleteItem, index } = this.props
        deleteItem(index)
    }
}

export default TodoItem
