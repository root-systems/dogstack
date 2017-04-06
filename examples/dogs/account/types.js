import t from 'tcomb-form'

export const Email = t.refinement(t.String, (s) => /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(s), 'Email')

function samePasswords (x) {
  return x.password === x.confirmPassword
}

export const minPasswordLength = 8
export const Password = t.subtype(t.String, s => s.length >= minPasswordLength)

export const SignUpFormSchema = t.subtype(t.struct({
  email: Email,
  name: t.String,
  password: Password,
  confirmPassword: Password
}), samePasswords)

export const SignInFormSchema = t.struct({
  email: Email,
  password: t.String
})
