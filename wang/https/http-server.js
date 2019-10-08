//http协议 交互过程 请求REQ 响应协议RES
//报文格式 字符串 
var net = require('net')
//引入net
var port = 8080
//设置端口号
var server = net.createServer()
//创建server

//http://localhost:8080/ 这个也可以访问

//write 响应报文
server.on('connection',conn=>{
  conn.on('data',data=>{
    var path = data.toString().split('\r\n')[0].split(' ')[1]
    console.log(path)
    conn.write(
`HTTP/1.1 200 OK
Content-Type:text/plain
Date: ${new Date().toISOString()}

<h1>nmsl , now is ${new Date().toISOString()}</h1>
`)
  conn.end()//关闭监听
    })
})

// win7 node v12 toLocaleString()无法使用
/* 
  on一个连接 形参里面再on一个data再用连接的形参write
  write里面是字符串
*/
server.listen(port,()=>{
  console.log('server listening on port',port)
})
//启动监听 listen还有第二个参数可以选择指定绑定的IP
//Content-Type:text/plain
//Content-Type:application/json

/*
启动监听后 浏览器会给服务端发送报文
GET / HTTP/1.1
Host:127.0.0.1:8080
Connection: keep-live
sec-ch-ua: Google Chrome 76
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0(Windows NT 10.0; Win67; x64) AppleWebKit/537.36 (KHTML,like Gecko) Chrome/76.0.3809.100 Safari/537.36
Sec-Fetch-Dest: document
Sec-Fetch-User: ?1
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng, *\/*;q=0.8,application/signed-exchange;v=b3
Sec-Fetch-Site:none
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7
*/
/*
  GET 后面的/ 浏览器想要请求的资源路径
  首部
  头
*/
// var pages = {
//   '/hello':`
//     <h1>hello</h1>
//   `,
//   '/world.html':`
//     <h1>hello</h1>
//     <h2>world</h2>
//   `
// }
/*HTTP/1.1 200 OK
  
*/
