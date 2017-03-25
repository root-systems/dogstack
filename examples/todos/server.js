const feathers = require('feathers')
const path = require('path')
const logger = require('morgan')
const errorHandler = require('feathers-errors/handler')
const Service = require('./service')

module.exports = function (db) {
  const app = feathers()

  app.use(logger('dev'))

  // if (app.get('env') === 'development') {
  //   // bundle client/index.js
  //   // and serve it at GET /bundle.js
  //   const webpackDevMiddleware = require('webpack-dev-middleware')
  //   const config = require('../webpack.config')
  //   const webpack = require('webpack')
  //   const compiler = webpack(config)
  //   const livereload = require('livereload')
  //   const lrserver = livereload.createServer()
  //
  //   lrserver.watch([
  //     __dirname
  //   ])
  //
  //   app.use(require('inject-lr-script')())
  //
  //   app.use(webpackDevMiddleware(compiler, {
  //     noInfo: true,
  //     publicPath: config.output.publicPath
  //   }))
  // }

  // static files
  app.use('/', feathers.static(path.join(__dirname, 'public')))
  app.configure(Service(db))
  app.use(function (err, req, res, next) {
    if (err) console.error('error', err)
    next(err)
  })

  // error handler
  app.use(errorHandler())
  return app
}
