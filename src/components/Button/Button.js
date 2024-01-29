import React from 'react'

const Button = React.forwardRef((props,ref) => {
  return (
   <button onClick={props.onclick} id={props.id} ref={ref}>{props.text}</button>
  )
})

export default Button
