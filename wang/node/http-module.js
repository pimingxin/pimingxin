var http = require('http')
var port = 8080
var server = http.createServer().on('request',(request,response) => {
  console.log(request.method,request.url)

  response.write('hello world')
  response.end()
})

server.listen(port,()=>{
  console.log('')
})

class HttpServer {
  constructor(f){
    var net = require('net')
    this.server = net.createServer(conn => {
      conn.on('data', data => {
        var request = data.toString()
        var [header,body] = request.split('\r\n\r\n')//按照\r\n\r\n拆分的只有两部分 一部分是头部 一部分是主体
        var [firstLine,...headers] = header.split('\r\n')
        //按照\r\n拆分头部的 只有第一行内容和其他内容 
        var content = headers.toString().match(/Accept:.*?(?=,)/g).toString().split(": ")[1]
        var [method,path] = firstLine.split(' ')
      })
    })
  }
  listen(){

  }
}