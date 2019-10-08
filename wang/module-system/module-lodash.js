// lodash.js

module.exports = '_'

function readFileContent(path){
  return fs.readFileSync(path).toString()
  //读取速度慢 至少加载一个文件30ms
  //fs.readFileSync(path) 二进制字节流 Sync同步
  fs.readFile(path,function(err,data){
    //出错了 第一个参数抛出错误 第二个参数为空
    //反之 第一个参数为空 第二个为数据
  })
}

function require(path){
  var code = readFileContent(path)
  var modFunc = new Function('module,exports',code)
  var module = {exprots : {}}
  modFunc(moudle,moudle.exprots)
  return module.exports
}


var lodash = require('./lodash.js')