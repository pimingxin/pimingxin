#!/usr/bin/env node

const http = require('http')
const fs = require('fs')
const fsp = fs.promises
const path = require('path')
const mime = require('mime')

const port = 8090
const baseDir = path.resolve('./')

//      http://localhost:8090/../../../../../../../../etc/passwd
//                    GET /../../../../../../../../etc/passwd
//            /home/pi/www/
//            /desktop/dcim/xxxx.jpg


// const server = http.createServer((req, res) => {
//   console.log(req.method, req.url)

//   var targetPath = path.join(baseDir, req.url)//    /foo/bar/
//   fs.stat(targetPath, (err, stat) => {
//     if (err) {
//       res.writeHead(404, {
//         'Content-Type': 'text/html; charset=UTF-8' 
//       })
//       res.end('404 Not Found')
//     } else {
//       if (stat.isFile()) {
//         fs.readFile(targetPath, (err, data) => {
//           res.end(data)
//         })
//       } else if (stat.isDirectory()) {
//         var indexPath = path.join(targetPath, 'index.html')
//         fs.stat(indexPath, (err, stat) => {
//           if (err) {
//             if (!req.url.endsWith('/')) {//如果地址栏里不/结尾，跳转到以/结尾的相同地址
//               res.writeHead(301, {
//                 'Location': req.url + '/'
//               })
//               res.end()
//               return
//             }
//             fs.readdir(targetPath, {withFileTypes: true}, (err, entries) => {
//               res.end(`
//                 ${
//                   entries.map(entry => {
//                     var slash = entry.isDirectory() ? '/' : ''
//                     return `
//                       <div>
//                         <a href="${entry.name}${slash}">${entry.name}${slash}</a>
//                       </div>
//                     `
//                   }).join('')
//                 }
//               `)
//             })

//           } else {//index.html exist, return it's content
//             fs.readFile(indexPath, (err, data) => {
//               res.end(data)
//             })
//           }
//         })
//       }
//     }
//   })
// })





const server = http.createServer(async (req, res) => {
  console.log(req.method, req.url)

  var targetPath = decodeURIComponent(path.join(baseDir, req.url))//    /foo/bar/
  
  //阻止将baseDir以外文件发送出去
  if (!targetPath.startsWith(baseDir)) {
    res.end('hello hacker')
    return
  }

  //阻止发送以点开头的文件夹（隐藏文件）里的文件
  if (targetPath.split(path.sep).some(seg => seg.startsWith('.'))) {
    res.end('hello hacker')
    return
  }

  try {
    var stat = await fsp.stat(targetPath)
    if (stat.isFile()) {
      var data = await fsp.readFile(targetPath)
      var type = mime.getType(targetPath)
      if (type) {
        res.writeHead(200, {'Content-Type': `${type}; charset=UTF-8`})
      } else {
        res.writeHead(200, {'Content-Type': `application/octet-stream`})
      }
      res.end(data)
    } else if (stat.isDirectory()) {
      var indexPath = path.join(targetPath, 'index.html')
      try {
        await fsp.stat(indexPath)
        var indexContent = await fsp.readFile(indexPath)
        var type = mime.getType(indexPath)
        if (type) {
          res.writeHead(200, {'Content-Type': `${type}; charset=UTF-8`})
        } else {
          res.writeHead(200, {'Content-Type': `application/octet-stream`})
        }
        res.writeHead(200, {'Content-Type': `${type}; charset=UTF-8`})
        res.end(indexContent)
      } catch(e) {//index.html文件不存在

        if (!req.url.endsWith('/')) {//如果地址栏里不/结尾，跳转到以/结尾的相同地址
          res.writeHead(301, {
            'Location': req.url + '/'
          })
          res.end()
          return
        }

        var entries = await fsp.readdir(targetPath, {withFileTypes: true})
        res.writeHead(200, {
          'Content-Type': 'text/html; charset=UTF-8'
        })
        res.end(`
          ${
            entries.map(entry => {
              var slash = entry.isDirectory() ? '/' : ''
              return `
                <div>
                  <a href="${entry.name}${slash}">${entry.name}${slash}</a>
                </div>
              `
            }).join('')
          }
        `)
      }
    }
  } catch(e) {
    res.writeHead(404, {
      'Content-Type': 'text/html; charset=UTF-8' 
    })
    res.end('404 Not Found')
  }
})






server.listen(port, () => {
  console.log(port)
})
