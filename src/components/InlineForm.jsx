import React from 'react'

export default class InlineForm extends React.Component {
  render () {
    return <div className="form-inline">{this.props.children}</div>
  }
}
