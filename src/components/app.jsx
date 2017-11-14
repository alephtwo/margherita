import React from 'react'
import Calculator from './calculator'
import { connect } from 'react-redux'

class App extends React.Component {
  render () {
    return (
      <div className="container">
        <div className="header">
          <h1>{'margherita'}</h1>
        </div>
        {this.generateRows()}
      </div>
    )
  }

  generateRows () {
    const { rows } = this.props
    return rows.map(r => <Calculator />)
  }
}

const mapStateToProps = (state) => ({ rows: state })

export default connect(mapStateToProps)(App)
