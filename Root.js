const h = require('react-hyperscript')
const { Provider: ReduxProvider } = require('react-redux')
const { ConnectedRouter } = require('react-router-redux')
const { IntlProvider } = require('react-intl')

const { StyleProvider } = require('./createStyle')
const getLocaleMessages = require('./lib/getLocaleMessages')

module.exports = Root

function Root (props) {
  const {
    history,
    store,
    locale = navigator.language,
    messagesByLocale,
    styleRenderer,
    styleNode,
    styleTheme,
    children
  } = props

  const messages = getLocaleMessages(messagesByLocale, locale)

  return (
    h(ReduxProvider, {
      store
    }, [
      h(StyleProvider, {
        renderer: styleRenderer,
        mountNode: styleNode,
        theme: styleTheme
      }, [
        h(IntlProvider, {
          locale,
          messages
        }, [
          h(ConnectedRouter, {
            history
          }, children)
        ])
      ])
    ])
  )
}
