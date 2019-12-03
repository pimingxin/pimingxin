const express = require('express')
const fs = require('fs')
const mine = require('mine')
const path = require('path')
const https = require('https')

const port = 3005

const app = express()

app.locals.pretty = true



app.use(express.static(__dirname + '/static'))


app.use((req,res,next) => {
  res.redirect(301,'/index.html')
})

app.listen(port,()=>{
  console.log(port)
})