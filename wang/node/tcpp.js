var net = require('net')

var server = net.createServer(conn => {
  conn.on('data', data => {
    console.log(data.toString())
  })
}).listen(8899, () => {
  console.log('i am molimicha')
})