# dogstack

**a big, happy, loveable client-side stack**

_(but it's also a bit dumb and tends to slobber everywhere)_

###### see also [catstack](https://github.com/enspiral-root-systems/cat-stack), dogstack's smarter, slimmer, more cunning partner in crime

## PRIOR ART

- architecture by @ahdinosaur on previous private projects
- https://github.com/jlongster/react-redux-universal-hot-example
- general discussions with teammates

## PURPOSE

- to handle all the high-level boilerplate in setting up a react redux app, and let you get on with writing components and util functions
- which is to say (so far) wiring up the routes, reducers needed
- to (eventually) be able to take in libs like async-props and mount them properly (args for certain parts of the app?)
- to (eventually) provide generators for scaffolding sub-apps
- to (eventually) provide some sensible plugins for general use cases (things like API, auth)
  - (though many of these probably belong on server stacks)

## NOTES

- apps are just collections of:
  - React components (manage local state, lifecycle methods etc)
  - actions
  - Redux reducers
  - React Router routes

- some ideas:
  - split your components into 'smart' and 'dumb' components (referred to as 'containers' and 'components' respectively)
  - wire your containers up with the 'connect' function from react-redux (the Provider is built into the stack routing)
  - if you do use connect, wire your containers up with reselect to pick out the slices of state you need (rather than passing props down the entire component tree from store)

## TEST-DRIVE

run the counter example by:
- `npm run build-example-counter`
- then spin up a server inside examples/counterApp, i suggest `python -m SimpleHTTPServer 2323` if you have python installed
- party on

## REQUIREMENTS

**MUST be used in an app that is browserified!**

needs user to provide:
- routes (as top-level route)
- reducers (as top-level reducer)
- mount element to render app into

in the future, further options:
- initial state.. i.e. if hydrating from local storage or server
- middleware to store (some kind of hook in)
- libs to routes (again, some kind of hook? useful for history type, async-props etc)

- utilities like 'connect' from react-redux and reselect are, for now, up to the user to implement, but could be sensible defaults in the future

## API

`npm install dogstack --save`

require the stack
`var stack = require('dogstack')`

it's just a simple function that takes a mount element, a root reducer, and a root route
`stack(mount, reducer, route)`

## IDEAS?

- CONSIDER STRONGLY implementing [redux-loop](https://github.com/raisemarketplace/redux-loop) as part of dogstack, as per the catstack / inu paradigm

* curried function off the main export? i.e.
`var stackWithReducers = stack(reducer)``
OR
`var stackWithRoutes = stack(null, routes)``
* each would return a function that expects the other arg
* might be unecessary for MVP

* both of reducer and routes could also be stack exports to help the user
* as per the 'further options' above
* no passing of store to routes at the moment, but will want to in future, this enables clever things

- no styling lib as of yet... will probably go with Stilr (esp if the PR for removing react dep comes through)


- feeling that the stack should def scaffold out the root reducer and route (though it kind of doesn't matter for route)
- otherwise you have to know that the stack is using react-router-redux under the hood when creating your root reducer

- for the root reducer, could just ask the user to pass in a object of reducers, and the stack just adds on the routing slice
- root route is less clear, in fact i think it can't easily get more modular than it is. just the restriction of using react-router
