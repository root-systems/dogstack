<h1 align="center">
  <img
    alt="dogstack on a post-it note"
    src="http://i.imgur.com/vjfouxn.jpg"
    height="250"
  />
  <br />
  dogstack
</h1>

<h4 align="center">
  :dog: :dog: :dog: a popular-choice grab-bag framework for teams working on production web apps
</h4>

<h6 align="center">
  :cat: see also <a href='https://github.com/enspiral-root-systems/cat-stack'>catstack</a>, dogstack's smarter, slimmer, more cunning partner in crime
</h4>

## features

- provides generators for scaffolding apps made of popular libraries
- abstracts away the app plumbing that you don't want to write again, and let's you focus on features
- prescribes enough opinion to reduce friction for your team
- is [omakase](https://www.youtube.com/watch?v=E99FnoYqoII), modules are hand-picked by expert chefs to deliver a consistent taste throughout
- gives prescriptive opinions for how to structure production-scale apps, to reduce friction for your team

## demos

- [dogstack.herokuapp.com](https://dogstack.herokuapp.com/): this repo's [./example](example) deployed to heroku

## modules

- user interface
  - view components: [react](https://facebook.github.io/react/)
  - view component tests: [enzyme](http://airbnb.io/enzyme/)
  - view styles and themes: [fela](http://fela.js.org/)
  - state store: [redux](http://redux.js.org)
  - data selectors: [reselect](https://github.com/reactjs/reselect)
  - action / reducer helpers: [redux-actions](https://github.com/acdlite/redux-actions)
  - async actions / effects: ??? (redux-thunk or redux-loop or redux-observable or ...)
  - client actions: [feathers-action](https://github.com/ahdinosaur/feathers-action)
  - router: [react-router](https://github.com/ReactTraining/react-router)
  - authentication: [redux-auth-wrapper](https://github.com/mjrussell/redux-auth-wrapper)
  - forms: [redux-form](http://redux-form.com/)
  - logging: [redux-logger](https://www.npmjs.com/package/redux-logger)
- data
  - manipulation: [ramda](http://ramdajs.com/docs/)
  - schemas: [tcomb](https://github.com/gcanti/tcomb)
- data services
  - services: [feathers](https://docs.feathersjs.com/)
  - authentication: [feathers-authentication](https://github.com/feathersjs/feathers-authentication)
  - configuration: [feathers-configuration](https://github.com/feathersjs/feathers-configuration)
  - emailer: [nodemailer](https://nodemailer.com/about/)
  - client transport: [feathers-primus](https://github.com/feathersjs/feathers-primus)
  - database adapter: [feathers-knex](https://github.com/feathersjs/feathers-knex)
- server
  - logging: [pino-http](https://github.com/pinojs/pino-http)
  - browser bundler: [browserify](https://github.com/substack/node-browserify)
  - browser bundle server: TODO [uify]
- database
  - [Postgres]
- command-line interface
  - task runner: [gulp](https://github.com/gulpjs/gulp)
  - prompts: [inquirer](https://github.com/SBoudrias/Inquirer.js)
  - file transformer: [gulp](https://github.com/gulpjs/gulp)
- tests
  - linter: [standard](https://github.com/feross/standard)
  - test runner: [ava](https://github.com/avajs/ava)
  - executable specifications: [cucumber](https://github.com/cucumber/cucumber-js)
  - headless browser: electron
- dev tools
  - transpiler: [babel]()
  - git hooks: [husky](https://github.com/typicode/husky)
  - release versioning
  - changelog helpers
  - documentation helpers
- ops tools
  - process management: ??? (pm2 or docker)
  - crash reporting: 

## distributions

- TODO user interface
- TODO universal user interface
- TODO data services
- TODO full stack (ui + services)
- TODO mobile using [react-native]
- TODO desktop using [electron]

## guides

- TODO how to install node.js and package manager
- TODO how to create a new `dogstack` app
- TODO how to setup a Postgres database
- TODO how to do authentication for your app
- TODO how to do styled components
- TODO how to create real-time data services
- TODO how to do authorization for your app
- TODO how to deploy your app
- TODO how to test your app using executable specifications
- TODO how to setup scheduled server tasks
- TODO how to send emails from your app
- TODO how to do a payment in your app

## other opinions

- TODO pluralize by adding 's', no exceptions

## prior art

- architecture by [@ahdinosaur](https://github.com/ahdinosaur) on previous private projects
- https://github.com/jlongster/react-redux-universal-hot-example0
- https://github.com/react-boilerplate/react-boilerplate
- general discussions with teammates
