var fs = require('fs')
var http = require('http')
var port = 8080

function listAllFilesSync(path) {
  var res = []
  var result = []
  var stat = fs.readFileSync(path)
  if (stat.isDirectory()){
    var names = fs.readdirSync(path)
    names.forEach(name => {
      var fullname = path + '/' + name
      if (name == "index.html"){
        return result.push(fullname)
      }else{
        var files = listAllFilesSync(fullname)
        res.push(...files)
      }
    })
  }
  return res
}

var server = http.createServer().on('request',(request,response) => {
  if (request.method == 'GET'){
    response.writeHead(200,{
      'Content-Type' : 'text/html; charset=UTF-8'
    })
    response.write(`

      hello world
    
    `)
  }
})

server.listen(port,()=> {

})


console.log(listAllFilesSync('C:\Users\Administrator\Desktop\github\wang\node'))