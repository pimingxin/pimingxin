var http = require('http')
var fs = require('fs')
var path = require('path')
var port = 8090

var basedir = __dirname

var server = http.createServer((req,res) => {
  var targetPath = path.join(basedir,res.path)
  fs.readFile(targetPath,(err,data) =>{
    if (err){
      res.writeHead(404,)
    }
  })
})


server.listen(port)