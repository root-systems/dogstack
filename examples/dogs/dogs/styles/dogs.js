export default {
  container: ({ color }) => {
    return {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: color,
      ':hover': {
        color: 'yellow'
      }
    }
  }
}
