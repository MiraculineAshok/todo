import React from 'react'
import Style from './Box.module.css'

const Box = React.forwardRef((props,ref) => {
  return (
    <div className={Style.container} id={props.id}  ref={ref}>
      {props.text}
    </div>
  )
});

export default Box
