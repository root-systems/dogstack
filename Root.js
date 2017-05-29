const h = require('react-hyperscript')
const { Provider: ReduxProvider } = require('react-redux')
const { ConnectedRouter } = require('react-router-redux')

const { StyleProvider } = require('./createStyle')

module.exports = Root

function Root (props) {
  const {
    history,
    store,
    styleRenderer,
    styleNode,
    styleTheme,
    children
  } = props

  return h(ReduxProvider, { store },
    h(StyleProvider, {
      renderer: styleRenderer,
      mountNode: styleNode,
      theme: styleTheme
    }, h(ConnectedRouter, {
        history
      }, children)
    )
  )
}
