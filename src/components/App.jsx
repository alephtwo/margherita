import React from 'react'
import Calculator from './Calculator'
import Card from './Card'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { List } from 'immutable'
import { Row, Column } from './Scaffolding'

class App extends React.Component {
  render () {
    return (
      <div className="container">
        <div className="header">
          <h1>{'margherita'}</h1>
        </div>
        <div className="background"></div>
        <Card
          header={this.generateButtons()}
          body={this.generateRows()}
          footer={this.generateAudio()} />
      </div>
    )
  }

  generateButtons () {
    const { dispatch } = this.props

    const announce = (type) => () => dispatch({ type: type });

    return (
      <Row classNames="text-center">
        <Column>
          <div className="btn-group text-center" role="group">
            <a className="btn btn-primary" onClick={announce('ADD_ROW')}>
              <i className="fa fa-plus white-text" />
            </a>
            <a className="btn btn-danger" onClick={announce('REMOVE_ROW')}>
              <i className="fa fa-minus white-text" />
            </a>
          </div>
        </Column>
      </Row>
    )
  }

  generateRows () {
    const { rows } = this.props
    return rows.map((row, i) => <Calculator key={i} rowId={i} data={row} />)
  }

  generateAudio () {
    return (
      <div className="text-center">
        <audio controls autoPlay loop>
          <source src={require('../assets/willamette-mall.mp3')} type="audio/mp3" />
        </audio>
        <br />
        <span>
          <small>Willamette Mall Music is <i className="fa fa-copyright" /> Capcom 2006</small>
        </span>
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  rows: PropTypes.instanceOf(List).isRequired
}

const mapStateToProps = (state) => ({ rows: state })
export default connect(mapStateToProps)(App)
