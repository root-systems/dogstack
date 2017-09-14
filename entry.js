const ReactDOM = require('react-dom')
const h = require('react-hyperscript')

const getDefaultExport = require('dogstack/lib/getDefaultExport')
const createRoot = require('dogstack/createRoot')

const config = require('dogstack/config')
window.config = config

const store = getDefaultExport(require('./store'))
const style = getDefaultExport(require('./style'))
const client = getDefaultExport(require('./client'))
const root = getDefaultExport(require('./root'))
const intl = getDefaultExport(require('./intl'))
const routes = getDefaultExport(require('./routes'))
const Layout = getDefaultExport(require('./layout'))

document.addEventListener('DOMContentLoaded', () => {
  const renderRoot = createRoot({
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
