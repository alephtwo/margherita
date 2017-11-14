import React from 'react'
import { connect } from 'react-redux'

class Calculator extends React.Component {
  render () {
    return (<p>{JSON.stringify(this.props)}</p>);
  }
}

export default connect()(Calculator)
