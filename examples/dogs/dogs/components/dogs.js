const React = require('react')

export default function Dogs (props) {
  console.log(props)
  return <div>
    <span>DOGS</span>
    {
      props.dogs.dogs.map((dog) => {
        return <span>{dog}</span>
      })
    }
  </div>
}
