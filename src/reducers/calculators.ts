import { List } from 'immutable'

interface Action {
  type: string;
  rowId: number;
  property: string;
  value: string | number;
}

const reducer = (state = List.of({ price: '', size: '' }), action: Action) => {
  switch (action.type) {
    case 'ADD_ROW': return addRow(state)
    case 'REMOVE_ROW': return removeAllButLast(state)
    case 'UPDATE_ROW': return updateRow(state, action)
    default: return state
  }
}

const addRow = (state: List<object>) =>
  state.push({ price: '', size: '' })

const removeAllButLast = (state: List<object>) => {
  if (state.size > 1) {
    return state.pop()
  }
  return state
}

const updateRow = (state: List<object>, {rowId, property, value}: Action) => {
  const row = state.get(rowId)
  const updated = { ...row, [property]: value };
  return state.set(rowId, updated)
}

export default reducer
