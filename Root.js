const h = require('react-hyperscript')
const { Provider: ReduxProvider } = require('react-redux')
const { Provider: FelaProvider } = require('@ahdinosaur/react-fela')
const { ConnectedRouter } = require('react-router-redux')

module.exports = Root

function Root (props) {
  const {
    history,
    store,
    styleRenderer,
    styleNode,
    children
  } = props

  return h(ReduxProvider, { store },
    h(FelaProvider, {
      renderer: styleRenderer,
      mountNode: styleNode
    }, h(ConnectedRouter, {
        history
      }, children)
    )
  )
}
