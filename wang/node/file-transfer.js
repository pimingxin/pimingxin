const net = require('net')
const fs = require('fs')

// const server = net.createServer( conn => {
//   fs.createReadStream('.json').pipe(conn)
// })
var port = 8080
process.stdin.pipe(net.connect(port,'10.1.1.1')).pipe(process.stdin)
