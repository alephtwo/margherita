import React from 'react'
import { connect } from 'react-redux'
import InlineForm from './InlineForm'
import TextInput from './TextInput'
import { Row, Column } from './Scaffolding'

const calculate = (price, diameter) => {
  const area =  Math.PI * ((diameter / 2) ** 2)
  return (area / price).toFixed(4)
}

class Calculator extends React.Component {
  render () {
    const { data } = this.props
    const { price, size } = data
    return (
      <InlineForm>
        <Row>
          <Column>
            <TextInput prefix="$" placeholder="9.99" value={price} />
          </Column>
          <Column>
            <TextInput suffix="in." placeholder="12" value={size} />
          </Column>
          <Column>
            <TextInput suffix="in²/$" value={calculate(price, size)} disabled />
          </Column>
        </Row>
      </InlineForm>
    );
  }
}

export default connect()(Calculator)
