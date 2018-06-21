const ReactDOM = require('react-dom')
const h = require('react-hyperscript')

const createRoot = require('./createRoot')

module.exports = createBrowserEntry

function createBrowserEntry (options) {
  const {
    config,
    store,
    style,
    client,
    root,
    intl,
    routes,
    Layout
  } = options

  document.addEventListener('DOMContentLoaded', () => {
    const renderRoot = createRoot({
      config,
      store,
      style,
      client,
      root,
      intl
    })

    const appNode = document.querySelector(root.appNode)

    ReactDOM.render(
      renderRoot([
        h(Layout, { routes })
      ]),
      appNode
    )
  })
}
