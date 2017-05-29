module.exports = Object.assign(
  {
    createBundler: require('./createBundler'),
    createClient: require('./createClient'),
    createDb: require('./createDb'),
    createLog: require('./createLog'),
    createServer: require('./createServer'),
    createStore: require('./createStore'),
    Root: require('./Root')
  }, 
  require('./createStyle')
)
