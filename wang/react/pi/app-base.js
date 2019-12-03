const express = require('express')
const port = 443
const https = require('https')
const fs = require('fs')
const mime = require('mime')
const cors = require('cors')
const path = require('path')
const fsp = fs.promises

const app = express()

const server = https.createServer({
  key:fs.readFileSync('/root/.acme.sh/www.pimingxin.xyz/www.pimingxin.xyz.key'),
  cert:fs.readFileSync('/root/.acme.sh/www.pimingxin.xyz/www.pimingxin.xyz.cer'),
},app)

// app.use(express.static(__dirname + '/static'))
app.use(express.static(__dirname + '/build/bobo'))

app.use((req, res, next) => {
  var type = path.parse(req.url).ext
  var htmltype = 'text/html'
  if (type)
    htmltype = mime.getType(type)
  res.set('Content-Type', htmltype + ';charset=UTF-8')
  next()
})

app.use((req,res,next) => {

})

app.use(cors({
  maxAge: 86400,
  credentials: true,
  origin: (origin, cb) => {
    return cb(null, true);
  }
}))

app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())

server.listen(port, () => {
  console.log(port)
})