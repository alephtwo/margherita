import React from 'react'
import PropTypes from 'prop-types'

class Scaffolding extends React.Component {
  render () {
    const { baseClass, classNames } = this.props
    const classes = `${baseClass} ${classNames}`

    return <div className={classes}>{this.props.children}</div>
  }
}

export class Row extends React.Component {
  render () {
    return <Scaffolding baseClass="row" {...this.props} />
  }
}
Row.propTypes = { children: PropTypes.node }

export class Column extends React.Component {
  render () {
    return <Scaffolding baseClass="col" {...this.props} />
  }
}
Column.propTypes = { children: PropTypes.node }
