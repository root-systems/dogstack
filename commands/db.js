const { join } = require('path')

// reference:
// https://github.com/tgriesser/knex/blob/master/bin/cli.js

module.exports = {
  command: 'db <subcommand> [options]',
  description: 'uses knex, see full cli usage at http://knexjs.org/#Migrations-CLI',
  builder: {},
  handler: argv => {
    // remove sub-command 'db' from args
    process.argv.splice(2, 1)

    // add --knexfile ./db
    const { cwd } = argv
    const dbConfigPath = join(cwd, 'db/index.js')
    process.argv.splice(2, 0, '--knexfile', dbConfigPath)

    require('knex/bin/cli')
  }
}
