import React from 'react'

export default function Dog (props) {
  return <div>
    <span>
      <i className='em em-dog' />
      {props.name}
      <i className='em em-dog' />
    </span>
  </div>
}
