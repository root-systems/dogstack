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
