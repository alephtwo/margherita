import * as React from 'react'
import { connect } from 'react-redux'
import Input from './Input'
import { Row, Column } from './Scaffolding'

const calculate = (price: number, diameter: number) => {
  const area = Math.PI * ((diameter / 2) ** 2)
  return (area / price).toFixed(4)
}

interface CalculatorProps {
  dispatch: any
  rowId: number
  price: number
  size: number
}

class Calculator extends React.Component<CalculatorProps, {}> {
  announce (property: string, value: any) {
    const { dispatch, rowId } = this.props
    dispatch({
      type: 'UPDATE_ROW',
      property: property,
      value: value,
      rowId: rowId
    })
  }

  render () {
    const { price, size } = this.props

    const announceValue = (property: string) => {
      return (e: any) => this.announce(property, e.target.value)
    }

    return (
      <Row classNames='text-center calculator-row'>
        <Column>
          <Input
            type='number'
            prefix='$'
            placeholder='9.99'
            step='0.01'
            value={price}
            onChange={announceValue('price')} />
        </Column>
        <Column>
          <Input
            type='number'
            suffix='in.'
            placeholder='12'
            value={size}
            min='0'
            onChange={announceValue('size')}/>
        </Column>
        <Column>
          <Input
            type='text'
            suffix='in²/$'
            value={calculate(price, size)}
            min='0'
            disabled />
        </Column>
      </Row>
    )
  }
}

export default connect()(Calculator)
