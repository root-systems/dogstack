const { assign } = Object

// reference:
// https://github.com/Flet/standard-engine/blob/master/bin/cmd.js

module.exports = {
  command: 'lint [files..]',
  description: 'lint your files with standard style',
  builder: {
    fix: {
      type: 'boolean',
      default: false,
      description: 'Automatically fix problems'
    },
    verbose: {
      type: 'boolean',
      default: false,
      description: 'Show rule names for errors (to ignore specific rules)'
    }
  },
  handler: argv => {
    const lintOptions = require('standard/options')
    const lint = require('standard-engine').cli

    const { cwd } = argv
    // remove sub-command 'lint' from args
    process.argv.splice(2, 1)
    lint(assign({ cwd }, lintOptions))
  }
}
