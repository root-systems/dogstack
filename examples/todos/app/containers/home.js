const React = require('react')
const { connect } = require('react-redux')
const EntryPoint = require('../components/entryPoint')
const { setCurrentUser } = require('../../assessment/actions')

function Home (props) {
  const { router, setCurrentUser } = props
  return (
    <div>
      <p>Welcome to Minded!</p>
      <EntryPoint router={router} setCurrentUser={setCurrentUser} />
    </div>
  )
}

module.exports = connect(
  (state) => state,
  {
    setCurrentUser
  }
)(Home)
