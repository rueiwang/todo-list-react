import * as types from '../constants/ActionTypes'

export const handleInput = (e) => {
    return {
        type: types.HANDLE_INPUT,
        payload: {
            input: e.target.value
        }
    }
}

export const addItem = (text) => {
    return {
        type: types.ADD_ITEM,
        payload: {
            text: text
        }
    }
}

export const deleteItem = (index) => {
    return {
        type: types.DELETE_ITEM,
        payload: {
            index: index
        }
    }
}

export const completeItem = (boolean, index) => {
    return {
        type: types.COMPLETE_ITEM,
        payload: {
            index: index,
            isComplete: boolean
        }
    }
}
export const changeStatus = (e) => {
    e.preventDefault()
    return {
        type: types.CHANGE_STATUS,
        payload: {
            status: e.target.classList[0]
        }
    }
}
