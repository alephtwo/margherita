import React from 'react'
import Calculator from './Calculator'
import { connect } from 'react-redux'

class App extends React.Component {
  render () {
    return (
      <div className="container">
        <div className="header">
          <h1>{'margherita'}</h1>
        </div>
        {this.generateButtons()}
        {this.generateRows()}
      </div>
    )
  }

  generateButtons () {
    const { dispatch } = this.props
    return (
      <div>
        <a className="btn btn-primary" onClick={() => dispatch({ type: 'ADD_ROW' })}>Add</a>
        <a className="btn btn-primary" onClick={() => dispatch({ type: 'REMOVE_ROW' })}>Delete</a>
      </div>
    )
  }

  generateRows () {
    const { rows } = this.props
    return rows.map((row, i) => <Calculator key={i} rowId={i} data={row} />)
  }
}

const mapStateToProps = (state) => ({ rows: state })
export default connect(mapStateToProps)(App)
