import React from 'react'
import PropTypes from 'prop-types'

export default class Input extends React.Component {
  getAddon (type) {
    const addon = this.props[type]
    if (!addon) {
      return null
    }

    return <div className="input-group-addon">{addon}</div>
  }

  render () {
    return (
      <div className="input-group">
        {this.getAddon('prefix')}
        <input className="form-control" {...this.props} />
        {this.getAddon('suffix')}
      </div>
    )
  }
}

Input.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  step: PropTypes.string
}
