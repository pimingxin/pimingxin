// var net = require('net')
// var port = 9090
// var quertstring = require('querystring')
// var server = net.createServer()


// var sxhr = new XMLHttpRequest()
// sxhr.open('get','https://xieranmaya.github.io/images/cats/cats.json',false)
// sxhr.send()
// var catsjson = JSON.parse(sxhr.responseText)




// function get(url,callback){
//   var xhr = new XMLHttpRequest()
//   xhr.open('get','http://xieranmaya.github.io/images/cats/' + url)
//   xhr.send()
// }

// server.on('connection',conn=>{
//   conn.on('data',data=>{
//     var request = data.toString()
//     var [header,body] = request.split('\r\n\r\n')
//     var [firstLine,...headers] = header.split('\r\n')
//     var [method,path] = firstLine.split(' ')

//     if (true || method == 'GET'){
//       conn.write('HTTP/1.1 200 OK\r\n')
//       conn.write('Content-Type: text.html; charset=UTF-8\r\n')
//       conn.write('\r\n')
//       conn.write(`

      
//       <button>猫</button>
//       <hr>
//       `)


//       catsjson.forEach(img => {
//         var html = `
//           <img src=${img.url} style="width:${img.width} ; height:${img.height} ;">
//         `
//         conn.write(html)
//       },null);
//       conn.end()
//       return
//     }
//   })
// })




const net = require('net')
const server = net.createServer()
const port = 8080

server.on("connection", conn => {
  conn.on('data', data => {
    var request = data.toString()
    var [header, body] = request.split('\r\n\r\n')
    var [firstLine, ...headers] = header.split('\r\n')
    var [method, path] = firstLine.split(' ')

    conn.write('HTTP/1.1 200 OK\r\n')
    conn.write('Content-Type: text/html; charset=UTF-8\r\n')
    conn.write('Date: ' + new Date().toString() + '\r\n')
    conn.write('\r\n')
    conn.write(`
    <body>
     <div onclick="get(damiao, showimgs)" id="btn1" style ="display: inline-block; background: black; color: white;">show pics</div>
     <div onclick="get(damiao, download)" id="btn2" style ="display: inline-block; background: black; color: white;">download 10 pics</div>
    </body>
    <script>
    const damiao = "https://xieranmaya.github.io/images/cats/cats.json"
    const base = "https://xieranmaya.github.io/images/cats/"
    const btn1 = document.querySelector("#btn1")
    const btn2 = document.querySelector("#btn2")

    function showimgs(respText) {
      // 解析json字符串
      let catArr = JSON.parse(respText)
      let cotainer = document.createElement('div')
      let fragment = document.createDocumentFragment()
      for (let i = 0; i < catArr.length; i++) {
        let img = document.createElement('img')
        img.src = base + catArr[i].url
        img.width = catArr[i].width >> 1
        img.height = catArr[i].height >> 1
        fragment.appendChild(img)
      }
      cotainer.appendChild(fragment)
      document.body.appendChild(cotainer)
    }
    
    function download(respText) {
      let catArr = JSON.parse(respText)
      let container = document.createElement('div')
      let fragment = document.createDocumentFragment()
      let img = document.createElement('img')
      function downGen(i = 0) {
        if (i >= 10) {
          container.appendChild(fragment)
          document.body.appendChild(container)
          return
        }
        img.width = catArr[i].width / 2
        img.height = catArr[i].height / 2
        img.src = base + catArr[i].url
        img.onload = () => {
          fragment.appendChild(img)
          img = document.createElement('img')
          downGen(i + 1)
        }
      }
      downGen()
    }

    function get(url, callback) {
      btn1.style.display = 'none'
      btn2.style.display = 'none'
      let req = new XMLHttpRequest()
      req.open("GET", url)
      req.addEventListener("load", function() {
        if (req.status < 400) {
          callback(req.responseText)
        } else {
          throw new Error("fail")
        }
      })
      req.send(null)
    }
    </script>
    `)
  })
})

server.listen(port, () => {
  console.log('server is listening on ' + port)
})