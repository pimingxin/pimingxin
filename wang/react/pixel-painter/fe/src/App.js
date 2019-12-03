import React ,{ Component } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client'
import PixelGrid from './PixelGrid'
import ColorSelect from './ColorSelect'
import { produce } from 'immer'



class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentColor:'red',
      pixelData:null
    }
  }
  
  componentDidMount(){
    this.socket = io('ws://localhost:3005')
    this.socket.on('pixel-data',(data) => {
      console.log(data)
      this.setState({
        pixelData:data
      })
    })
    this.socket.on('update-dot', info => {
      console.log(info)
      this.setState({
        pixelData: this.state.pixelData.map((row,rowIdx) => {
          if (rowIdx === info.row){
            return row.map((color,colIdx) => {
              if (colIdx === info.col){
                return info.color
              }else{
                return color
              }
            })
          }else{
            return row
          }
        })
      })
    })
  }

  handlePixelClick = (row,col) => {
    this.socket.emit('draw-dot' , {
      row,
      col,
      color:this.state.currentColor
    })
  }

  changeCurrentColor = (color) => {
    console.log(color)
    this.setState({
      currentColor:color
    })
  }

  render() {
    return (
      <div>
        <PixelGrid onPixelClick={this.handlePixelClick} pixels={this.state.pixelData} />
        <ColorSelect onChange={this.changeCurrentColor} color={this.state.currentColor} />
      </div>
    );
  }
    
}

export default App;
