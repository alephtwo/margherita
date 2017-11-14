import React from 'react'

export class Row extends React.Component {
  render () {
    return <div className="row">{this.props.children}</div>
  }
}

export class Column extends React.Component {
  render () {
    return <div className="col">{this.props.children}</div>
  }
}
