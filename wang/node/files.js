var fs = require('fs')
var fsp = fs.promises

/**
 * 接收一个文件夹路径，返回这个文件夹里面的所有文件名
 * 需要递归的得到所有的文件名 并放在一个一维数组里返回
 * 需要写三个版本：
 * 同步版
 * 回调版
 * Promise版本
 */
function listAllFilesSync(dirPath) {
  var res = []
  var stat = fs.statSync(dirPath)
  if (stat.isFile()){
    return[dirPath]
  }else{
    var names = fs.readdirSync(dirPath)
    names.forEach(name => {
      var fullname = dirPath + '/' + name
      var stat = fs.statSync(fullname)
      var files = listAllFilesSync(fullname)
      res.push(...files)
    })
  }
  return res
}


function listAllFilesCallback(dirPath, cb) {
  
  fs.stat(dirPath,(err,stat) => {
    var res = []
    if (stat.isFile()){
      cb([dirPath])
    }else{
      fs.readdir(dirPath,{withFileTypes: true}, (err,entries) => {
        var res = []
        var count = 0
        if (entries.length == 0) {
          return []
        }
        entries.forEach((entry,i) => {
          var fullPath = dirPath + '/' + entry.name
          
          listAllFilesCallback(fullPath,files => {
            res[i] = files
            count++
            if (count == entries.length){
              cb([].concat(...res))
              return res
            }
          })
        })
      })
    }
  })
}


function listAllFilesPromise(dirPath) {
  return fsp.stat(dirPath).then(stat => {
    if (stat.isFile()){
      return [dirPath]
    }else{
      return fsp.readdir(dirPath),{withFileTypes:true}.then(entries => {
        return Promise.all(entries.map(entry => {
          var fullPath = dirPath + '/' + entry.name
          return listAllFilesPromise(fullPath)
        }))
      })
    }
  }).then(arrays => {
    return arrays
  })
}


// var files = listAllFiles('C:/Users/Administrator/Desktop/github/wang/node')

// listAllFilesCallback('c:/', (err, files) => {

// })
console.log(listAllFilesSync('C:/Users/Administrator/Desktop/github/wang/node') , 'Sync')
console.log(listAllFilesPromise('C:/Users/Administrator/Desktop/github/wang/node'),'promise')

listAllFilesCallback('C:/Users/Administrator/Desktop/github/wang/node',console.log)
