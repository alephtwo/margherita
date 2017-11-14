import { List, Record } from 'immutable'

const makeCalculator = Record({ price: 0, size: 0 })

const reducer = (state = List.of(makeCalculator()), action) => {
  switch (action.type) {
    case 'ADD_ROW': return addRow(state)
    case 'REMOVE_ROW': return removeAllButLast(state)
    default: return state
  }
}

const addRow = (state) => state.push(makeCalculator())

const removeAllButLast = (state) => {
  if (state.size > 1) {
    return state.pop()
  }
  return state
}

export default reducer
