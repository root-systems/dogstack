const { Route, IndexRoute } = require('react-router')
const React = require('react')

// Top Level Containers
const App = require('./app/containers/layout')
const Home = require('./app/containers/home')
const Assessment = require('./assessment/containers/assessment')
const HowItWorks = require('./app/containers/howItWorks')

const Root = ({store}) => {
  return (
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
			<Route path='/assessment' component={Assessment} />
			<Route path='/howitworks' component={HowItWorks} />
		</Route>
  )
}

module.exports = Root
