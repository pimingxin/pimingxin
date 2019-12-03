import React , { Component } from 'react'

var colors = ['red','orange','yellow','green','aqua','blue','purple']

var liStyle = {
  float:'left',
  listStyle:'none'
}

var ulStyle = {
  margin:0,
  padding:0
}

var btnStyle = {
  width:'1em',
  height:'1em'
}


function ColorSelect(props){
  return (
    <ul style={ulStyle}>
      {
        colors.map(color => (
          <li style={liStyle} key={color}><button onClick={() => props.onChange(color)} style={{...btnStyle,backgroundColor:color}}></button></li>
        ))
      }
    </ul>
  )
}

export default ColorSelect