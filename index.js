module.exports = Object.assign(
  {
    createClient: require('./createClient'),
    createDb: require('./createDb'),
    createLog: require('./createLog'),
    createApiServer: require('./createApiServer'),
    createAssetServer: require('./createAssetServer'),
    createStore: require('./createStore'),
    Root: require('./Root')
  }, 
  require('./createStyle')
)
