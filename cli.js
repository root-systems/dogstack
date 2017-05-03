#!/usr/bin/env node

const Cli = require('yargs')

const argv = Cli
  .usage('Usage: $0 <command> [options]')
  .commandDir('commands')
  .options({
    help: {
      type: 'boolean',
      alias: 'h',
      description: 'Show help'
    },
    version: {
      type: 'boolean',
      description: 'Show current version'
    },
    cwd: {
      type: 'string',
      default: process.cwd(),
      description: 'Base directory from which the relative paths are resolved'
    }
  })
  // must call a subcommand, --help, or --version
  .check(argv => argv.help || argv.version, false)
  .help()
  .argv

if (!argv._[0] && argv.version) {
  const pkg = require('./package.json')
  console.log(pkg.version)
}
