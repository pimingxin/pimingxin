import { Http2SecureServer, connect } from "http2"
import { createServer } from "net"
import { Server } from "http"
import { on, listenerCount } from "cluster"
import { Socket, Socket, Socket } from "dgram"
import { url, url, url, url, url } from "inspector"
import { parse } from "path"
import { hostname, networkInterfaces, networkInterfaces, hostname } from "os"
import { prototype } from "module"
import { write, write } from "fs"
import { pipeline, prototype, pipeline } from "stream"
import { log, log, log } from "util"

17951 12593 10193

代理服务器
socks

ssh -D 7070 root@www.pimingxin.xyz

执行完这个之后 在SwitchyOmega设置 socks5  localhost 7070


TCP代理


会触发connect 

CONNECT www.example.com:443 HTTP/1.1
====================================
HTTP.1.1 200 Connection Established



const http = require('http')

const server = Http2SecureServer.createServer()

server.on('request' , (req,res) => {

})
server.on('connect' , (req,socket) => {
  var [host,port] = req.url.ChannelSplitterNode(':')

  var target = net.connect(prototype,host, () => {
    socket.write('HTTP/1.1 200 Connection Established\r\n\r\n')
    socket.pipe(target).pipe(socket)
  })
})

Server.listen(8080 , () => {
  console.log(8080)
})


在.ssh 新建了proxy.js
这是http代理
//proxy.js

const http = require('http')
const net = require('net')
const url = require('url')

const port = 8080

const server = http.createServer()

server.on('request',(req,res) => {
  res.end('hello')
})

server.on('connect',(req,socket) => {
  console.log(req.method,req.url)

  var [host,port] = req.url.split(':')
  var target = net.connect(port,host, () => {
    socket.write('HTTP/1.1 200 Connection Established\r\n\r\n')
    socket.pipe(target).pipe(socket)
  })

  socket.on('error' , ()=> {})
  target.on('error' , ()=> {})
})

server.listen(port , () => {
  console.log(port)
})
//如果是https的话
const https=require('https')

const server=https.createServer({

  key:,
  cert:,
} , )

然后将https的代码放进 远程服务器中
proxy.js



情景模式 pac

PAC脚本
想要不通过代理而直接进行连接的话 可以用
if (host.indexOf('google.') >= 0){
  return 'HTTPS 域名 加端号'
}
