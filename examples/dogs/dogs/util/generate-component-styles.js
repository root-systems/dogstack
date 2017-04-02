import mapValues from 'lodash/mapValues'

export default function generateComponentStyles (styles) {
  return (props) => (renderer) => {
    return mapValues(styles, (style) => {
      return renderer.renderRule(style, props)
    })
  }
}
