import React from 'react'

export default function Dog (props) {
  console.log(props)
  return <div>
    <span>{props.name}</span>
  </div>
}
