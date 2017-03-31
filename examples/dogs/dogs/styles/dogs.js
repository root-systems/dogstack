export default {
  container: ({ color }) => {
    return {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: color,
      ':hover': {
        color: 'yellow'
      }
    }
  }
}
