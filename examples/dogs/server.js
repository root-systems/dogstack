const feathers = require('feathers')
const path = require('path')
const logger = require('morgan')
const errorHandler = require('feathers-errors/handler')
const Bundler = require('browserify')
const BundlerMiddleware = require('watchify-middleware')
const LiveReload = require('tiny-lr')
const Accept = require('accepts')
const injectLiveReloadScript = require('inject-lr-script')
const createIndexHtml = require('create-html')
const pump = require('pump')
const BufferList = require('bl')

const Service = require('./service')

module.exports = function (db) {
  const app = feathers()

  app.use(logger('dev'))

  // service api
  app.configure(Service(db))

  // static files
  app.use('/', feathers.static(path.join(__dirname, 'assets')))

  // bundler
  const bundleUrl = '/bundle.js'
  const bundleEntry = 'browser.js'
  const bundler = Bundler(bundleEntry, {
    debug: app.get('env') === 'development',
    // config for watchify
    cache: {},
    packageCache: {},
    basedir: __dirname
  })
  if (app.get('env') === 'development') {
    const bundlerEmitter = BundlerMiddleware.emitter(bundler)
    const liveReloadServer = LiveReload()
    liveReloadServer.listen()
    bundlerEmitter.on('update', () => {
      LiveReload.changed(bundleUrl)
    })
    app.use(injectLiveReloadScript())
    app.use(function (req, res, next) {
      const accept = Accept(req)
      if (req.url === bundleUrl) {
        bundlerEmitter.middleware(req, res)
        return
      }
      switch (accept.type(['html'])) {
        case 'html':
          res.setHeader('content-type', 'text/html')
          res.send(createIndexHtml({
            script: bundleUrl,
            head: `
              <style id="app-styles"></style>
              <style id="app-fonts"></style>
              <link href="https://afeld.github.io/emoji-css/emoji.css" rel="stylesheet">
            `,
            body: `<div id='app'></div>`
          }))
          return
      }
      next()
    })
  } else {
    // TODO publish as a re-usable module
    // browserify-serve?
    var bundleReady = false
    var bundleQueue = []
    const bundleCache = BufferList()
    pump(bundler.bundle(), bundleCache, (err) => {
      bundleReady = true
      bundleQueue.forEach(queueItem => queueItem())
      bundleQueue = null
    })
    app.use(function (req, res, next) {
      if (bundleReady) sendBundle()
      else bundleQueue.push(sendBundle)
      function sendBundle () {
        pump(bundleCache.duplicate(), res)
      }
    })
  }

  app.use(function (err, req, res, next) {
    if (err) console.error('error', err)
    next(err)
  })

  // error handler
  app.use(errorHandler())
  return app
}
