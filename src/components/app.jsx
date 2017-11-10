import Inferno from 'inferno'
import Component from 'inferno-component'
import Calculator from './calculator'

export default class App extends Component {
  render () {
    return (
      <div className="container">
        <div className="header lobster">
          <h1>margherita</h1>
        </div>
        <Calculator />
      </div>
    );
  }
}
