/* eslint-disable no-useless-constructor */
import React, { Component } from 'react'

class TodoItem extends Component {
    render () {
        // eslint-disable-next-line react/prop-types
        const { item } = this.props
        return (
            <li className={
                item.isChecked ? 'done' : ''
            }>
                <label className="container">
                    <input type="checkbox"
                        onChange={(e) => { return this.props.completeItem(e.target.checked, item.id) }}
                        checked={item.isChecked}
                    />
                    {item.name}
                    <span className="checkmark"></span>
                    <button
                        onClick={this.props.deleteItem.bind(this, item.id)}><i className="fas fa-trash-alt"></i></button>
                </label>
            </li>
        )
    }
}

export default TodoItem
