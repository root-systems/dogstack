const React = require('react')
const { Link } = require('react-router')

function NavBar (props) {
  return (
    <div className='navbar'>
      <h1><Link to={`/`}>Minded</Link></h1>
    </div>
  )
}

module.exports = NavBar
