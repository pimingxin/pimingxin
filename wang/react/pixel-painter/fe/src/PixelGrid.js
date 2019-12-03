import React , { Component } from 'react'
import Dot from './Dot'

function PixelGrid(props){
  if (!props.pixels){
    return null
  } else {
    return (
      <table style={{tableLayout:'fixed',backgroundColor:'rgba(0,0,0,0.05)'}}>
        <tbody>
        {
          props.pixels.map((row,rowindex) => (
            <tr key={rowindex}>
              {
                row.map((color,colindex) => (
                  <Dot onClick={() => props.onPixelClick(rowindex,colindex)} rowIdx={rowindex} colIdx={colindex} color={color} />
                ))
              }
            </tr>
          ))
        }
        </tbody>
      </table>
    )
  }
}

export default PixelGrid