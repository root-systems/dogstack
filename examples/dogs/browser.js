const React = require('react')
const ReactDOM = require('react-dom')
import { Provider as ReduxProvider } from 'react-redux'
import { Provider as FelaProvider } from 'react-fela'
const { browserHistory } = require('react-router')
import { syncHistoryWithStore } from 'react-router-redux'

import store from './store'
import createRenderer from './renderer'
import Router from './router'

// store.subscribe(() => {})

document.addEventListener('DOMContentLoaded', () => {
  const history = syncHistoryWithStore(browserHistory, store)
  const renderer = createRenderer()
  const mountNode = document.getElementById('app-styles')

  ReactDOM.render(
    <ReduxProvider store={store}>
      <FelaProvider renderer={renderer} mountNode={mountNode}>
        <Router history={history} store={store} />
      </FelaProvider>
    </ReduxProvider>,
    document.querySelector('#app')
  )
})
