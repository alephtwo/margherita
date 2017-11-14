import { List } from 'immutable'

const reducer = (state = List.of({ price: 0, size: 0 }), action) => {
  switch (action.type) {
    case 'ADD_ROW': return addRow(state)
    case 'REMOVE_ROW': return removeAllButLast(state)
    default: return state
  }
}

const addRow = (state) => state.push({ price: 0, size: 0 })

const removeAllButLast = (state) => {
  if (state.size > 1) {
    return state.pop()
  }
  return state
}

export default reducer
