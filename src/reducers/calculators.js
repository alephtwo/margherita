import { List } from 'immutable'

const reducer = (state = List.of({ price: '', size: '' }), action) => {
  switch (action.type) {
    case 'ADD_ROW': return addRow(state)
    case 'REMOVE_ROW': return removeAllButLast(state)
    case 'UPDATE_ROW': return updateRow(state, action)
    default: return state
  }
}

const addRow = (state) => state.push({ price: '', size: '' })

const removeAllButLast = (state) => {
  if (state.size > 1) {
    return state.pop()
  }
  return state
}

const updateRow = (state, { rowId, property, value }) => {
  const row = state.get(rowId)
  const updated = Object.assign({}, row, { [property]: normalize(value) })
  return state.set(rowId, updated)
}

const normalize = (value) => {
  if (value !== '' && +value < 0) {
    return 0
  }

  return value
}

export default reducer
