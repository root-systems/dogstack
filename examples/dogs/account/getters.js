import { createSelector, createStructuredSelector } from 'reselect'

export const getAccount = (state) => state.account

export const getSigningIn = createSelector(
  getAccount,
  (account) => account.signingIn
)

export const getError = createSelector(
  getAccount,
  (account) => account.error
)

export const getSignInProps = createStructuredSelector({
  error: getError
})

