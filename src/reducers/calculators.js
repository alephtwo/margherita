import { List } from 'immutable'

const reducer = (state = List.of({}), action) => {
  switch (action.type) {
    case 'ADD_ROW': return addRow(state)
    case 'REMOVE_ROW': return removeAllButLast(state)
    default: return state
  }
}

const addRow = (state) => state.push({})

const removeAllButLast = (state) => {
  if (state.size > 1) {
    return state.pop()
  }
  return state
}

export default reducer
