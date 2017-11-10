import Inferno from 'inferno'
import { Provider } from 'inferno-redux'
import { createStore } from 'redux'
import App from './components/app'

const store = createStore(() => {})

const app = (
  <Provider store={store}>
    <App />
  </Provider>
)

Inferno.render(app, document.getElementById('app'))
