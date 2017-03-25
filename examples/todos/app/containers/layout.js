const React = require('react')
const { connect } = require('react-redux')
const { Link } = require('react-router')
const NavBar = require('../components/navBar')
const Layout = (props) => {
	return (
		<div>
			<NavBar />
			{props.children}
			<div className='privacyPolicy'>
        <h3><a href='https://minded.co.nz/privacy-policy/'>
          Privacy Policy
        </a></h3>
      </div>
		</div>
	)
}

module.exports = connect((state) => state)(Layout)
