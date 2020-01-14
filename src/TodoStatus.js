import React, { Component, Fragment } from 'react'

class TodoStatus extends Component {
    constructor (props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    render () {
        const { visibility } = this.props
        return (
            <Fragment>
                <div>
                    <a href="#"
                        className={`all ${visibility === 'all' ? 'active' : ''}`}
                        onClick={this.handleClick}>全部</a></div>
                <div>
                    <a href="#"
                        className={`pending ${visibility === 'pending' ? 'active' : ''}`}
                        onClick={this.handleClick}>待辦</a></div>
                <div>
                    <a href="#"
                        className={`done ${visibility === 'done' ? 'active' : ''}`}
                        onClick={this.handleClick}>已完成</a></div>
            </Fragment>
        )
    }

    handleClick (e) {
        e.preventDefault()
        const { changeStatus } = this.props
        const status = e.target.classList[0]
        changeStatus(status)
    }
}

export default TodoStatus
