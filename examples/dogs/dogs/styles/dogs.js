export default {
  container: ({ color }) => {
    return {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: color
    }
  },
  dogsContainer: () => {
    return {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '20px'
    }
  },
  adoptButton: () => {
    return {
      marginTop: '20px'
    }
  }
}
