import React from 'react'
import PropTypes from 'prop-types'

class Scaffolding extends React.Component {
  getClasses () {
    const { baseClass, classNames } = this.props
    const safeBaseClass = baseClass || ''

    return classNames ? `${baseClass} ${classNames}` : safeBaseClass
  }

  render () {
    return <div className={this.getClasses()}>{this.props.children}</div>
  }
}
Scaffolding.propTypes = {
  baseClass: PropTypes.string,
  classNames: PropTypes.string,
  children: PropTypes.node
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
