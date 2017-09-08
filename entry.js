const React = require('react')
const ReactDOM = require('react-dom')
const { Provider: ReduxProvider } = require('react-redux')
const { Provider: FelaProvider } = require('react-fela')
const { ConnectedRouter } = require('react-router-redux')
const createBrowserHistory = require('history/createBrowserHistory').default
const h = require('react-hyperscript')
const merge = require('ramda/src/merge')

const getDefaultExport = require('dogstack/lib/getDefaultExport')
const config = require('dogstack/config')
window.config = config
const Root = require('dogstack/Root')
const createStore = require('dogstack/createStore')
const { createStyleRenderer } = require('dogstack/createStyle')
const createClient = require('dogstack/createClient')

const storeOptions = getDefaultExport(require('./store'))
const styleOptions = getDefaultExport(require('./style'))
const clientOptions = getDefaultExport(require('./client'))
const rootOptions = getDefaultExport(require('./root'))
const intlOptions = getDefaultExport(require('./intl'))
const routes = getDefaultExport(require('./routes'))
const Layout = getDefaultExport(require('./layout'))

document.addEventListener('DOMContentLoaded', () => {
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
  const { messagesByLocale } = intlOptions

  const styleNode = document.querySelector(rootOptions.styleNode)
  const appNode = document.querySelector(rootOptions.appNode)

  ReactDOM.render(
    h(Root, {
      history,
      store,
      styleRenderer,
      styleTheme,
      styleNode
    }, [
      h(Layout, { routes })
    ]),
    appNode
  )
})
