const { join } = require('path')

const script = join(__dirname, '../cli.js')

// reference:
// -  https://github.com/fgnass/node-dev/blob/master/bin/node-dev

module.exports = {
  command: 'dev [command]',
  description: 'uses node-dev',
  builder: {},
  handler: argv => {
    const dev = require('node-dev')

    const scriptArgs = process.argv.slice(3)
    process.env.NODE_ENV = 'development'
    dev(script, scriptArgs, [], {
      deps: true,
      notify: true
    })
  }
}
