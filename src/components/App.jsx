import React from 'react'
import Calculator from './Calculator'
import Card from './Card'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { List } from 'immutable'
import { Row, Column } from './Scaffolding'

class App extends React.Component {
  render () {
    return (
      <div className="container">
        <div className="header">
          <h1>{'margherita'}</h1>
        </div>
        <Card header={this.generateButtons()} body={this.generateRows()} />
      </div>
    )
  }

  generateButtons () {
    const { dispatch } = this.props
    return (
      <Row classNames="text-center">
        <Column>
          <div className="btn-group text-center" role="group">
            <a className="btn btn-primary" onClick={() => dispatch({ type: 'ADD_ROW' })}>
              <i className="fa fa-plus" />
            </a>
            <a className="btn btn-danger" onClick={() => dispatch({ type: 'REMOVE_ROW' })}>
              <i className="fa fa-minus" />
            </a>
          </div>
        </Column>
      </Row>
    )
  }

  generateRows () {
    const { rows } = this.props
    return rows.map((row, i) => <Calculator key={i} rowId={i} data={row} />)
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  rows: PropTypes.instanceOf(List).isRequired
}

const mapStateToProps = (state) => ({ rows: state })
export default connect(mapStateToProps)(App)
