import React from 'react'
import PropTypes from 'prop-types'

export default class TextInput extends React.Component {
  getAddon (type) {
    const addon = this.props[type]
    if (!addon) {
      return null
    }

    return <div className="input-group-addon">{addon}</div>
  }

  render () {
    const { disabled, onChange, placeholder, value } = this.props
    return (
      <div className="input-group">
        {this.getAddon('prefix')}
        <input
          type="text"
          className="form-control"
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onChange={onChange} />
        {this.getAddon('suffix')}
      </div>
    )
  }
}

TextInput.propTypes = {
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
}
