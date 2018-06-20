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
</h6>

## features

- abstracts away the app plumbing that you don't want to write again, and let's you focus on features
- prescribes enough opinion to reduce friction for your team
- is [omakase](https://www.youtube.com/watch?v=E99FnoYqoII), modules are hand-picked by expert chefs to deliver a consistent taste throughout
- gives prescriptive opinions for how to structure production-scale apps

## examples

- [dogstack.netlify.com](https://dogstack.netlify.com/): [dogstack-example](https://github.com/root-systems/dogstack-example) deployed to netlify / heroku

## documentation

[dogstack.js.org](https://dogstack.gitbooks.io/handbook/content/)

## cli usage

- [api](#api)
- [asset](#asset)
- [db](#db)

### api server

starts api server

```shell
dog api
```

### asset server

starts asset server

```shell
dog asset
```

### db

Runs [`knex`](http://knexjs.org/#Migrations-CLI) command, with any arguments.

```shell
dog db
```

## api usage

### `server.js`


export configuration for the [`feathers`](http://feathersjs.com) server

- `services`: an array of functions that will be run with [`server.configure(service)`](https://docs.feathersjs.com/api/application.html#configurecallback)

example:

```js
// server.js
export default {
  services: [
    require('./agents/service')
    require('./accounts/service'),
    require('./authentication/service'),
    require('./profiles/service'),
    require('./relationships/service')
  ]
}
```

```js
// agents/service.js
import feathersKnex from 'feathers-knex'

export default function () {
  const app = this
  const db = app.get('db')

  const name = 'dogs'
  const options = { Model: db, name }

  app.use(name, feathersKnex(options))
  app.service(name).hooks(hooks)
}

const hooks = {
  before: {},
  after: {},
  error: {}
}
```

### `browser.js`

dogstack exports a function `createBrowserEntry` out of `browser.js` with which to generate your dogstack client app. a dogstack app should have a file which calls this function with the required arguments, and which has it's name passed to `entry` as part of the `asset` [config](#config).

example:
```js
const createBrowserEntry = require('dogstack/browser')
const Config = require('dogstack/config')
const config = Config()()
window.config = config

// other imports of files needed for browser entry argument, as outlined in sections below

createBrowserEntry({
  config,
  store,
  style,
  client,
  root,
  intl,
  routes,
  Layout
})
```

explanations and examples of the parts that must be passed to `createBrowserEntry`:

#### `config`
a [feathers-configuration](https://github.com/feathersjs/configuration) compatible config object. Dogstack provides [`dogstack/config`](#configjs) as a wrapper around feathers-configuration to make this easy

example:
```js
// config/default.js
module.exports = {
  favicon: 'app/favicon.ico',
  api: {
    port: 3001,
    name: 'Dogstack Example',
    url: 'http://localhost:3001/',
  },
  asset: {
    port: 3000,
    entry: 'browser.js',
    root: 'app/assets',
    url: 'http://localhost:3000/'
}
```

#### `store`
an object with `updater` and `epic` properties:
- [`updater`](https://github.com/rvikmanis/redux-fp#updaters-vs-reducers): a function of shape `action => state => nextState`, combined from each topic using [`redux-fp.concat`](https://github.com/rvikmanis/redux-fp/blob/master/docs/API.md#concat)
- [`epic`](https://redux-observable.js.org/): a function of shape `(action$, store, { feathers }) => nextAction$`, combined from each topic using [`combineEpics`](https://redux-observable.js.org/docs/api/combineEpics.html)

example:
```js
// store.js
import updater from './updater'
import epic from './epic'

export default {
  updater,
  epic
}
```

#### `style`
an object with `theme` and `setup` properties:
- `theme`: object passsed to `<FelaThemeProvider theme={theme} />`
- `setup`: function of shape `(renderer) => {}`

example:
```js
// style.js
export default {
  theme: {
    colorPrimary: 'green',
    colorSecondary: 'blue'
  },
  setup: (renderer) => {
    renderer.renderStatic(
      { fontFamily: 'Lato' },
      'html,body,#app'
    )
    renderer.renderFont('Lato', [
      'https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff'
    ])
  }
}
```

#### `client`
configuration for [`feathers` client](https://docs.feathersjs.com/api/client.html), as an object with `services` and `config` properties:
- `services`: an array of functions that will be run with [`client.configure(plugin)`](https://docs.feathersjs.com/api/application.html#configurecallback)
- `apiUrl`: the url of the api server for the client to connect to (normally this can be extracted from your `config`)

example:
```js
// client.js
export default {
  services: [
    authentication
  ],
  config
}
```

#### `root`
a configuration object for the root React component with `appNode` and `styleNode` properties:
- `appNode`: query selector string or dom node to render app content
- `styleNode`: query selector string or dom node to render app styles

example:
```js
// root.js
export default {
  appNode: '#app',
  styleNode: '#app-styles',
}
```

#### `routes`
an array of [React routes](https://github.com/ReactTraining/react-router) to be rendered as props into your top-level `Layout` component

example:
```js
// routes.js
export default [
  {
    name: 'home',
    path: '/',
    exact: true,
    Component: Home,
    selector: getIsNotAuthenticated,
    navigation: {
      title: 'app.home',
      icon: 'fa fa-home'
    }
  },
  {
    name: 'dogs',
    path: '/',
    exact: true,
    Component: UserIsAuthenticated(DogsContainer),
    selector: getIsAuthenticated,
    navigation: {
      title: 'dogs.dogs',
      selector: getIsAuthenticated,
      icon: 'fa fa-paw'
    }
  },
  {
    name: 'dog',
    path: '/d/:dogId',
    Component: UserIsAuthenticated(DogContainer)
  }
]
```

#### `Layout`
your top-level rendered React component, which accepts `routes` as props

example:
- see the [dogstack-example Layout component](https://github.com/root-systems/dogstack-example/blob/master/app/components/Layout.js)
