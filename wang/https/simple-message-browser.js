
var net = require('net')
var querystring = require('querystring')

var port = 8080

var server = net.createServer()

var mesg = [{
  name:'张三',
  timestamp:1567480612234,
  message:'nmsl',
},{
  name:'李四',
  timestamp:1567480612234,
  message:'nmsl',
}]
server.on('connection',conn=>{
  conn.on('data',data=>{
    var request = data.toString()
    var [header,body] = request.split('\r\n\r\n')//按照\r\n\r\n拆分的只有两部分 一部分是头部 一部分是主体
    var [firstLine,...headers] = header.split('\r\n')
    //按照\r\n拆分头部的 只有第一行内容和其他内容 
    var content = headers.toString().match(/Accept:.*?(?=,)/g).toString().split(": ")[1]
    var [method,path] = firstLine.split(' ')
    
    if (method == 'POST'){
      var msgs = querystring.parse(body)//获取到body
      msgs.timestamp = Date.now()
      mesg.push(msgs)//保存信息
      conn.write('HTTP/1.1 302 Moved\r\n')//跳转指令 目的是为了在刷新页面的同时 数据不会再次请求 而是会跳转到Location/ 就是根目录
      conn.write('Location: /\r\n\r\n')
      conn.end()
      return//让后面的语句不再运行
    }
    

    if (true || method == 'GET') {//总为真
      conn.write('HTTP/1.1 200 OK\r\n')
      conn.write('Content-Type: text/html; charset=UTF-8\r\n')
      conn.write('Access-Control-Allow-Origin: *\r\n')
      conn.write('Date: ' + new Date().toString() + '\r\n')
      conn.write('\r\n')
      if (content === "text/plain"){
        conn.write("<h1>text/plain</h1>")
      }else if (content === "text/html"){
        conn.write("<h1>text/html</h1>")
      }else if (content === "application/json"){
        conn.write(`<h1>text/html</h1><img src='data:image/png;base64,/9j/4AAQSkZJRgABAQEBXgFeAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAAJABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDV/Z1+Puk+KfDfiax1Lwz4dtbqxhlisktUSzvfOaEyQwFY5HYyFkwPLYsRIeSwVT7F8GtO1Dx3+y7b+JJ9R0XVNUvI5YNJe1KBtZlQkqpYqm6ZljK9SMyDdhgcfmv8Of8AlIV+y3/15aL/AOi7uv1f+OX/ACB/g/8A9hxv/RrV+T8QZTSwNalNe97Sz7Wu2rdb7f1ufcyzKVWi4wio7+ey/U//2Q=='></img>`)
      }
      conn.write('\r\n')
      conn.write(`
        <style>
          .message-box {
            border:5px solid;
            border-color:rgb(${parseInt(Math.random()*255)},${parseInt(Math.random()*255)},${parseInt(Math.random()*255)});
            margin:5px;
            padding:10px;
          }
        </style>
        <form method="POST" action="/">
          Name: <br>
          <input name="name" /> <br>
          Message:<br>
          <textarea name="message"></textarea>
          <br>
          <button>提交</button>
        </form>
        <hr>
      `)
      }
      
      mesg.reduceRight((memo,msg) => {
        var html = `
          <div class="message-box">
            <h3>${msg.name}<small>${new Date(msg.timestamp.toLocaleString())}</small></h3>
            <pre>${encodeURI(msg.message)}</pre>
            
          </div>
        `
        conn.write(html)
      },null)

      switch(headers.Accept){
        case "application/json":
          conn.write("application/json")
          break
        case "text/html":
          conn.write("text/html")
          break
        case "text/plain":
          conn.write("text/plain")
          break
      }
      

      conn.end()
      return 
    
  })
})
server.listen(port,()=>{
  console.log('server listening on port',port)
})

//XSS cross site scripting 跨站脚本攻击 跨越整个站点的脚本攻击
