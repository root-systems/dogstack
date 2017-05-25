const { createRenderer } = require('@ahdinosaur/fela')

// TODO publish preset `fela-preset-dogstack`
// plugins and enhancers from https://github.com/cloudflare/cf-ui/blob/master/packages/cf-style-provider/src/index.js#L40

/*
const prefixer = require('fela-plugin-prefixer')
const fallbackValue = require('fela-plugin-fallback-value')
const unit = require('fela-plugin-unit')
const lvha = require('fela-plugin-lvha')
const validator = require('fela-plugin-validator')
const beautifier = require('fela-beautifier')
const fontRenderer = require('fela-font-renderer')
const monolithic = require('fela-monolithic')
*/

module.exports = createStyleRenderer

function createStyleRenderer (options) {
  const {
    fontNode: userFontNode,
    plugins: userPlugins = [],
    enhancers: userEnhancers = [],
    setup,
    dev = process.env.NODE_ENV === 'development',
    selectorPrefix
  } = options

  const fontNode = typeof userFontNode === 'string'
    ? document.querySelector(userFontNode)
    : userFontNode

  var defaultPlugins = []//[prefixer(), fallbackValue(), unit(), lvha()]
  var defaultEnhancers = []//[fontRenderer(fontNode)]

  // if (dev) {
  if (false && dev) {
    defaultPlugins.push(validator())
    defaultEnhancers.push(beautifier())
    defaultEnhancers.push(monolithic())
  }

  const plugins = [...defaultPlugins, ...userPlugins]
  const enhancers = [...defaultEnhancers, ...userEnhancers]

  const renderer = createRenderer({
    plugins,
    enhancers,
    selectorPrefix
  })

  setup(renderer)

  return renderer
}
