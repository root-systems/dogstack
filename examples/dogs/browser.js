const React = require('react')
const ReactDOM = require('react-dom')
const { Provider } = require('react-redux')
const { browserHistory } = require('react-router')
import { syncHistoryWithStore } from 'react-router-redux'

import store from './store'
import Router from './router'

// store.subscribe(() => {})

document.addEventListener('DOMContentLoaded', () => {
  const history = syncHistoryWithStore(browserHistory, store)

  ReactDOM.render(
    <Provider store={store}>
      <Router history={history} store={store} />
    </Provider>,
    document.querySelector('#app')
  )
})
