const http = require('http')
const fs = require('fs')
const path = require('path')
const fsp = fs.promises
const mime = require('mime')

const port = 8090
const basedir = __dirname

// var server = http.createServer((req,res) => {

//   var targetPath = path.join(basedir,req.url)//请求的url
//   fs.stat(targetPath,(err,stat) => {
//     if (err){
//       res.writeHead(404,{
//         'Content-Type':'text/html;chatset=UTF-8'
//       })
//       res.end('404 not found')
//     }else{
//       if (stat.isFile()){
//         fs.readFile(targetPath,(err,data) =>{
//           res.end(data)
//         })
//       }else if (stat.isDirectory()){
//         var indexPath = path.join(targetPath,'index.html')
//         fs.stat(indexPath,(err,stat) => {
//           if (err){
//             //index.html noe exist
//             //readdir
//             if (!req.url.endsWith('/')) {//如果用户把斜杠删除的话 需要添加上/
//               res.writeHead(301,{
//                 'Location': req.url + '/'
//               })
//               res.end()
//               return 
//             }
//             fs.readdir(targetPath,{withFileTypes:true},(err,entries) => {
//               res.writeHead(200,{
//                 'Content-Type':'text/html;chatser=UTF-8'
//               })
//               res.end(`
//                 ${
//                   entries.map(entry => {
//                     var isDir = entry.isDirectory() ? '/' : ''

//                     return `
//                     <div>
//                       <a href=${entry.name}${isDir}>${entry.name}${isDir}</a>
//                     </div>
//                     `
//                   }).join('')
//                 }
//               `)
//             })
//           }else{
//             fs.readFile(indexPath,(err,data)=>{
//               res.end(data)
//             })
//           }
//         })
//       }
//     }
//   })
// })



//需要解码
//使用async 和 await

const server = http.createServer(async (req,res) => {
  console.log(req.method,req.url)
  var targetPath = decodeURIComponent(path.join(basedir,req.url))
  try{
    var stat = await fsp.stat(targetPath)
    if (stat.isFile()){
      var data = await fsp.readFile(targetPath)
      var type = mime.getType(targetPath)
      if (type){
        res.writeHead(200,{'Content-Type':`${type};chatset=UTF-8`})
      }else{
        res.writeHead(200,{'Content-Type':`application/octet-stream`})
      }
      res.end(data)
    } else if (stat.isDirectory()){
      var indexPath = path.join(targetPath,'index.html')
      try{
        await fsp.stat(indexPath)
        var indexContent = await fsp.readFile(indexPath)
        var type = mime.getType(indexPath)
        if (type){
          res.writeHead(200,{'Content-Type':`${type};chatset=UTF-8`})
        }else{
          res.writeHead(200,{'Content-Type':`application/octet-stream`})
        }
        res.end(indexContent)
      }catch(e){//index.html文件不存在
        if (!req.url.endsWith('/')) {//如果用户把斜杠删除的话 需要添加上/
            res.writeHead(301,{
              'Location': req.url + '/'
            })
            res.end()
            return 
          }
          var entries = await fsp.readdir(targetPath,{withFileTypes:true})
          res.end(`
            ${
              entries.map(entry => {
                var isDir = entry.isDirectory() ? '/' : ''

                return `
                <div>
                  <a href=${entry.name}${isDir}>${entry.name}${isDir}</a>
                </div>
                `
              }).join('')
            }
        `)
      }
    }
  }catch(e){//如果找不到文件的话 返回404
    res.writeHead(404,{
      'Content-Type':'text/html;chatser=UTF-8'
    })
    res.end('404 Not Found')
  }
})

server.listen(port,()=>{
  console.log(port)
})