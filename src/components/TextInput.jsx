import React from 'react'

export default class TextInput extends React.Component {
  getAddon (type) {
    const addon = this.props[type]
    if (!addon) {
      return null;
    }

    return <div className="input-group-addon">{addon}</div>
  }

  render () {
    const { disabled, placeholder, value } = this.props;
    return (
      <div className="input-group">
        {this.getAddon('prefix')}
        <input
          type="text"
          className="form-control"
          placeholder={placeholder}
          value={value}
          disabled={disabled} />
        {this.getAddon('suffix')}
      </div>
    );
  }
}
