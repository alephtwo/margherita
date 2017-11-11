import React from 'react'
import Calculator from './calculator'

export default class App extends React.Component {
  render () {
    return (
      <div className="container">
        <div className="header">
          <h1>{'margherita'}</h1>
        </div>
        <Calculator />
      </div>
    );
  }
}
