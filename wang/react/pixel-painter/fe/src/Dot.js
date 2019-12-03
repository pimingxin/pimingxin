import React from "react"

function Dot(props){
  console.log('run')
  return (
    <td onClick={props.onClick} style={{width:'5px',height:'5px',backgroundColor:props.color}}></td>
  )
}

export default Dot