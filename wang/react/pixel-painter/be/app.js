const express = require('express')
const SocketIO = require('socket.io')

const port = 3005

const app = express()

const server = app.listen(port, () => {
  console.log(port)
})

const io = SocketIO(server)

// app.use(express.static(path.join(__dirname,'./dist')))

const pixelDate = [
  ['red','black','blue','white'],
  ['red','black','blue','white'],
  ['red','black','blue','white'],
  ['red','black','blue','white']
]

io.on('connection' , (socket) => {
  socket.emit('pixel-data',pixelDate)

  socket.on('draw-dot',({row,col,color}) => {
    pixelDate[row][col] = color
    socket.broadcast.emit('update-dot',{row,col,color})
    socket.emit('update-dot',{row,col,color})

  })

  socket.on('disconnect' , () => {
    console.log('someone leaves')
  })

})