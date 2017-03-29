import { createStructuredSelector } from 'reselect'

export const getDogs = (state) => state.dogs.dogs

export const getIndexProps = createStructuredSelector({
  dogs: getDogs
})
