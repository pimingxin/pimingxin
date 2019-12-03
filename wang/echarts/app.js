const express = require('express')
const fs = require('fs')
const mine = require('mine')
const path = require('path')
const https = require('https')

const port = 8080

const app = express()

app.locals.pretty = true

app.use(express.json())

app.use(express.static(__dirname + '/static'))

app.get('/' , (req,res,next) => {
  
})

app.listen(port,()=>{
  console.log(port)
})