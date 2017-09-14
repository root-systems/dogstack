const h = require('react-hyperscript')
const { FormattedMessage: OgFormattedMessage } = require('react-intl')
const { isNil, merge } = require('ramda')

// GK: react-intl's FormattedMessage component can't take className as props directly: https://github.com/yahoo/react-intl/issues/704
// GK: hence we use a wrapper to pass in a child function: https://github.com/yahoo/react-intl/wiki/Components#string-formatting-components

const classifyIntlMessage = (className) => {
  return {
    children: (...elements) => (
      h('span', { className }, elements)
    )
  }
}

const FormattedMessage = (props) => {
  const nextProps = isNil(props.className)
    ? props
    : merge(props, classifyIntlMessage(props.className))
  return h(OgFormattedMessage, nextProps)
}

module.exports = {
  FormattedMessage
}
