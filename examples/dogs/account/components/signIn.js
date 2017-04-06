import React from 'react'
import t from 'tcomb-form'

import styles from '../styles/signIn'

import { SignInFormSchema } from '../types'

export default class SignIn extends React.Component {

  onSubmit (evt) {
    evt.preventDefault()
    const value = this.refs.form.getValue()
    if (value) this.props.signIn(value)
  }

  render () {
    const { error } = this.props
    return (
      <div className={"TODO"}>
        {error && <div className='has-error'>{error.message}</div>}
        <form onSubmit={(evt) => this.onSubmit(evt)} >
          <t.form.Form type={SignInFormSchema} ref='form' />
          <button type='submit'>Sign In</button>
        </form>
      </div>
    )
  }

}
