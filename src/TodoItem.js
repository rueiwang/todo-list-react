import React, { Component } from 'react'

class TodoItem extends Component {
    constructor (props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.checkedItem = this.checkedItem.bind(this)
    }

    render () {
        // eslint-disable-next-line react/prop-types
        const { item } = this.props
        return (
            <li className={
                item.isChecked ? 'done' : ''
            }>
                <label className="container">
                    <input type="checkbox"
                        onChange={this.checkedItem}
                        checked={item.isChecked}
                    />
                    {item.name}
                    <span className="checkmark"></span>
                    <button
                        onClick={this.handleClick}><i className="fas fa-trash-alt"></i></button>
                </label>
            </li>
        )
    }

    handleClick () {
        // eslint-disable-next-line react/prop-types
        const { deleteItem, index } = this.props
        console.log(index)
        deleteItem(index)
    }

    checkedItem (e) {
        const { index, doneItem } = this.props
        console.log(e.target.checked)
        doneItem(index, e.target.checked)
    }
}

export default TodoItem
