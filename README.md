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

- provides generators for scaffolding apps made of popular libraries
- abstracts away the app plumbing that you don't want to write again, and let's you focus on features
- prescribes enough opinion to reduce friction for your team
- is [omakase](https://www.youtube.com/watch?v=E99FnoYqoII), modules are hand-picked by expert chefs to deliver a consistent taste throughout
- gives prescriptive opinions for how to structure production-scale apps, to reduce friction for your team

## examples

- [dogstack.herokuapp.com](https://dogstack.herokuapp.com/): [dogstack/example](https://github.com/dogstack/example) deployed to heroku

## documentation

[dogstack.js.org](https://dogstack.gitbooks.io/handbook/content/)

## cli usage

- [dev](#dev)
- [server](#server)
- [test](#test)
- [lint](#lint)

### dev server

starts development server

```shell
dog dev server
```

### server

starts production server

```shell
dog server
```

### test

runs [`ava`](https://github.com/avajs/ava) tests

can optionally take a [glob](https://www.npmjs.com/package/glob)

```shell
dog test -- './todos/**/*.test.js'
```

default glob is `./**/*.test.js` ignoring `node_modules`

### lint

checks for [standard style](http://standardjs.com)

can optionally take a [glob](https://www.npmjs.com/package/glob)

```shell
dog lint -- './todos/**/*.js'
```

default glob is `./**/*.js` ignoring `node_modules`

## api usage

### `server.js`

export an array of functions that will be run with [`server.configure(service)`](https://docs.feathersjs.com/api/application.html#configurecallback)

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

### `store.js`

export configuration for the [`redux`](http://redux.js.org/) store:

- [`updater`](https://github.com/rvikmanis/redux-fp#updaters-vs-reducers): a function of shape `action => state => nextState`, combined from each topic using [`redux-fp.concat`](https://github.com/rvikmanis/redux-fp/blob/master/docs/API.md#concat)
- [`epic`](https://redux-observable.js.org/): a function of shape `(action$, store, { feathers }) => nextAction$`, combined from each topic using [`combineEpics`](https://redux-observable.js.org/docs/api/combineEpics.html)
- [`middlewares`](http://redux.js.org/docs/Glossary.html#middleware): an array of functions of shape `store => next => action`
- [`enhancers`](http://redux.js.org/docs/Glossary.html#store-enhancer): an array of functions of shape `createStore => createEnhancedStore

```js
// store.js
import updater from './updater'
import epic from './epic'

const middlewares = []
const enhancers = []

export default {
  updater,
  epic,
  middlewares,
  enhancers
}
```

### `style.js`

export configuration for [`fela`](https://github.com/rofrischmann/fela)

```js
// style.js
export default {
  fontNode: '#app-fonts',
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

### `client.js`

export an array of functions that will be run with [`client.configure(plugin)`](https://docs.feathersjs.com/api/application.html#configurecallback) for the [Feathers client](https://docs.feathersjs.com/api/client.html)


```js
// client.js
export default {
  services: []
}
```

### `root.js`

export configuration for root React component

- `appNode`: query selector string for dom node to render app content
- `styleNode`: query selector string for dom node to render app styles

```js
// root.js
export default {
  appNode: '#app',
  styleNode: '#app-styles',
}
```

### `routes.js`

export [React routes](https://github.com/ReactTraining/react-router)

TODO this is not yet standardized, at the moment depends on your Layout.

### `layout.js`

export layout React component, which accepts `routes` as props

TODO this is not yet standardized
