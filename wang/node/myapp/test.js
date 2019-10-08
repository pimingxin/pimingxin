var express = require('express')
var server = express()
var cors = require('cors')

server.use((req,res,next) => {
  req.on('data' , data => {

  })
})

server.use(cors({

}))

server.get('/',(req,res) => {
  res.send('hello')
})

server.use((req,res,next) => {
  if (req.method == 'GET' || req.url =='/'){
    res.send()
  }else{
    next()
  }
})