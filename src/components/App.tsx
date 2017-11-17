import * as React from 'react'
import { connect } from 'react-redux'
import { List } from 'immutable'
import Calculator from './Calculator'
import Card from './Card'
import { Row, Column } from './Scaffolding'

interface AppProps {
  dispatch?: any
  context?: any
  rows: any
}

class App extends React.Component<AppProps, {}> {
  render () {
    return (
      <div className='container'>
        <div className='header'>
          <h1 className='app-name'>{'margherita'}</h1>
        </div>
        <div className='background'></div>
        <Card
          header={this.generateButtons()}
          body={this.generateRows()}
          footer={this.generateAudio()} />
      </div>
    )
  }

  generateButtons (): React.ReactNode {
    const { dispatch } = this.props

    const announce = (type: string) => () => dispatch({ type: type })

    return (
      <Row classNames='text-center'>
        <Column>
          <div className='btn-group text-center' role='group'>
            <a className='btn btn-primary' onClick={announce('ADD_ROW')}>
              <i className='fa fa-plus white-text' />
            </a>
            <a className='btn btn-danger' onClick={announce('REMOVE_ROW')}>
              <i className='fa fa-minus white-text' />
            </a>
          </div>
        </Column>
      </Row>
    )
  }

  generateRows (): React.ReactNode {
    const { rows } = this.props
    return rows.map((row: {price: number, size: number}, i: number) =>
      <Calculator key={i} rowId={i} price={row.price} size={row.size} />)
  }

  generateAudio (): React.ReactNode {
    return (
      <div className='text-center'>
        <audio controls autoPlay loop>
          <source src={require('../assets/willamette-mall.mp3')} type='audio/mp3' />
        </audio>
        <br />
        <span>
          <small>Willamette Mall Music is <i className='fa fa-copyright' /> Capcom 2006</small>
        </span>
      </div>
    )
  }
}

const mapStateToProps = (state: List<object>) => ({ rows: state })
export default connect(mapStateToProps)(App)
