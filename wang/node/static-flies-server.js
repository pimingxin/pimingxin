const http = require('http')
const fs = require('fs')
const fsp = fs.promises
const path = require('path')
const port = 8090

const baseDir = __dirname

const server = http.createServer((req,res) => {
  var targetPath = path.join(baseDir,req.url)
  fs.readFile(targetPath,(err,data) =>{
    console.log(req.url)
    if (err){
      res.writeHead(404,{
        'Content-Type':'text/html;charset=UTF-8'
      })
      console.log(err)
      res.end("您请求的文件不存在")
    }else{
      res.end(data)
    }
  })
})


server.listen(port,()=> {
  console.log(port)
})