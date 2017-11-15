import React from 'react'
import PropTypes from 'prop-types'

export default class Card extends React.Component {
  static getBlock (prop, klass) {
    if (!prop) {
      return null
    }
    return <div className={klass}>{prop}</div>
  }

  render () {
    const { header, body, footer } = this.props

    return (
      <div className="card">
        {Card.getBlock(header, 'card-header')}
        {Card.getBlock(body, 'card-body')}
        {Card.getBlock(footer, 'card-footer')}
      </div>
    )
  }
}

Card.propTypes = {
  header: PropTypes.node,
  body: PropTypes.node,
  footer: PropTypes.node
}
