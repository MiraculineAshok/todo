// import React from 'react'



// const Inputbox = (props) => {
//   return (
//     React.forwardRef((props,ref) => {
//    <input type={props.type} id={props.id} ref={ref}></input>
//     }))
// }

// export default Inputbox
import React from 'react'

const input = React.forwardRef((props, ref) => (
    <input type={props.type} id={props.id} ref={ref}></input>
  ));

  export default input