const fs = require('fs')
const fsp = fs.promises

function listAllFilesSync(path) {
  var res = []
  var stat = fs.statSync(path) //同步将路径的所有状态获得
  if (stat.isFile()){ // 如果是文件的话 返回路径
    return [path]
  }else{
    var names = fs.readdirSync(path) // 如果是文件夹的话 分析文件夹下的所有路径
    names.forEach(name => {  // 使用forEach循环  如果在异步里 不能使用forEach 但可以使用传统for循环 或者使用map 获得值与下标 使res的这个下标项 等于路径
      var fullname = path + '/' + name //获得的是部分路径 需要加上后面的路径 
      var stat = fs.statSync(fullname) // 再分析文件夹里面的文件 获得里面的状态
      var files = listAllFilesSync(fullname) // 递归
      res.push(...files) // 推入数组
    })
  }
  /* else的另一个
  else{
    var entries = fs.readdirSync(path,{withFileTypes:true})
    entries.forEach(entry => {
      var fullPath = path + '/' + entry.name
      var files = listAllFilesSync(fullPath)
      res.puah(...files)
    })
  }
  */
  return res
}

console.log(listAllFilesSync('C:/Users/Administrator/Desktop/github/wang/node'))
