const React = require('react')
const ReactDOM = require('react-dom')
const { Provider } = require('react-redux')
const { createStore, applyMiddleware, compose } = require('redux')
const createHistory = require('history').createHashHistory
const { Router, hashHistory } = require('react-router')
const ReduxThunk = require('redux-thunk').default
const reducer = require('./reducer')
const Routes = require('./routes')

const store = createStore(
	reducer,
	{},
	compose(
		applyMiddleware(ReduxThunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
)

store.subscribe(() => {})

const Root = ({store}) => {
	return (
		<Provider store={store}>
			<Router history={hashHistory}>
        {Routes({store})}
			</Router>
		</Provider>
)
}

document.addEventListener('DOMContentLoaded', () => {
	console.log('DOMContentLoaded')
	const root = document.querySelector('#app')

	ReactDOM.render(
		<Root store={store}/>,
		root
	)
})
