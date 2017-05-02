const { assign } = Object

const defaults = {
  babel: "inherit",
  require: [
    "babel-register"
  ]
}

// reference:
// https://github.com/avajs/ava/blob/master/lib/cli.js

module.exports = {
  command: 'test [files..]',
  description: 'uses ava, see full cli usage at https://github.com/avajs/ava#cli',
  builder: {},
  handler: argv => {
    const test = require('ava/lib/cli')

    const { cwd } = argv
    // remove sub-command 'test' from args
    process.argv.splice(2, 1)

    test.run({ cwd, defaults })
  }
}
