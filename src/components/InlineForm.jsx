import React from 'react'
import PropTypes from 'prop-types'

class InlineForm extends React.Component {
  render () {
    return <div className="form-inline">{this.props.children}</div>
  }
}

InlineForm.propTypes = { children: PropTypes.node }

export default InlineForm
