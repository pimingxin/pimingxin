var net = require('net')

var servers = net.createServer()

servers.on('connection', conn => {
  console.log(1)
})


servers.listen(8080)





//

var net = require('net')

var port = 8080

var server = net.createServer()

server.on('connection',conn => {
  conn.on('data',data=>{
    conn.write(
`

`)
conn.end()
  })
  conn.on('error',()=>{

  })
})



server.listen(port,()=>{
  console.log(port)
})
