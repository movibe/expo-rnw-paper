import cloneDeep from 'lodash.clonedeep'

// https://redux.js.org/recipes/structuring-reducers/refactoring-reducer-example

export function updateObject(oldObject, newValues) {
    // Encapsulate the idea of passing a new object as the first parameter
    // to Object.assign to ensure we correctly copy data instead of mutating
    return cloneDeep(Object.assign({}, oldObject, newValues))
}

export function updateItemInArray(array, itemId, updateItemCallback) {
    const updatedItems = array.map(item => {
        // Since we only want to update one item, preserve all others as they are now
        if (item.id !== itemId)
            return item

        // Use the provided callback to create an updated item
        const updatedItem = updateItemCallback(item)
        return updatedItem
    })

    return updatedItems
}

export function createReducer(initialState, handlers) {
    return function reducer(state = initialState, action) {
        return handlers.hasOwnProperty(action.type)? handlers[action.type](state, action): state
    }
}
