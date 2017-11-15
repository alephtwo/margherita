import React from 'react'
import PropTypes from 'prop-types'

export class Row extends React.Component {
  render () {
    return <div className="row">{this.props.children}</div>
  }
}
Row.propTypes = { children: PropTypes.node }

export class Column extends React.Component {
  render () {
    return <div className="col">{this.props.children}</div>
  }
}
Column.propTypes = { children: PropTypes.node }
