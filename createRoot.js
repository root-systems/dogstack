const React = require('react')
const ReactDOM = require('react-dom')
const { Provider: ReduxProvider } = require('react-redux')
const { Provider: FelaProvider } = require('react-fela')
const { ConnectedRouter } = require('react-router-redux')
const createBrowserHistory = require('history/createBrowserHistory').default
const h = require('react-hyperscript')
const merge = require('ramda/src/merge')

const Root = require('./Root')
const createStore = require('./createStore')
const { createStyleRenderer } = require('./createStyle')
const createClient = require('./createClient')

module.exports = createRoot

function createRoot (options) {
  const {
    config,
    store: storeOptions,
    style: styleOptions,
    client: clientOptions,
    root: rootOptions,
    intl: intlOptions
  } = options

  const state = { config }
  const history = createBrowserHistory()
  const client = createClient(clientOptions)
  window.client = client

  const store = createStore(
    merge(
      { state, history, client },
      storeOptions
    )
  )
  window.store = store

  const styleTheme = styleOptions.theme
  const styleRenderer = createStyleRenderer(styleOptions)
  const { locale, messagesByLocale } = intlOptions

  return (children) => {
    return h(Root, {
      history,
      store,
      locale,
      messagesByLocale,
      styleRenderer,
      styleTheme
    }, children)
  }
}
