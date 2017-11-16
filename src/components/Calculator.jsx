import React from 'react'
import { connect } from 'react-redux'
import Input from './Input'
import { Row, Column } from './Scaffolding'
import PropTypes from 'prop-types'

const calculate = (price, diameter) => {
  const area = Math.PI * ((diameter / 2) ** 2)
  return (area / price).toFixed(4)
}

class Calculator extends React.Component {
  announce (property, value) {
    const { dispatch, rowId } = this.props
    dispatch({
      type: 'UPDATE_ROW',
      property: property,
      value: value,
      rowId: rowId
    })
  }

  render () {
    const { data } = this.props
    const { price, size } = data

    const announceValue = (property) => {
      return e => this.announce(property, e.target.value)
    }

    return (
      <Row classNames="text-center calculator-row">
        <Column>
          <Input
            type="number"
            prefix="$"
            placeholder="9.99"
            step="0.01"
            value={price}
            onChange={announceValue('price')} />
        </Column>
        <Column>
          <Input
            type="number"
            suffix="in."
            placeholder="12"
            value={size}
            onChange={announceValue('size')}/>
        </Column>
        <Column>
          <Input
            type="text"
            suffix="in²/$"
            value={calculate(price, size)}
            disabled />
        </Column>
      </Row>
    )
  }
}

Calculator.propTypes = {
  dispatch: PropTypes.func.isRequired,
  rowId: PropTypes.number.isRequired,
  data: PropTypes.shape({
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }).isRequired
}

export default connect()(Calculator)
