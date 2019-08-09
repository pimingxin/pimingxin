



function require(path) {
  //处理缓存
  if (require.moduleCache.hasOwnProperty(path)) {
    return require.moduleCache[path]
  }

  //加载文件
  var code = new Function('module,exports',readFile(path))
  var module = {exports:{}}

  code(module,module.exports)

  require.moduleCache[path] = module.exports //处理缓存
  return module.exports
}
require.moduleCache = {}




//读取一个路径 通过一个路径 读到里面的内容 然后把内容给返回
function readFile(path) {
  var xhr = new XMLHttpRequest()     //创建一个请求的对象
  xhr.open('GET', path, false)    //让它去请求这个地址 然后开始请求
  xhr.send()     //等他请求完了
  return xhr.responseText     //然后返回
}


function require(path) {
  if (require.moduleCache.hasOwnProperty(path)) { 
    //预缓存 判断里面有无这个路径 有的话直接输出
    return require.moduleCache[path]
  }
  var code = readFile(path)
  var modFun = new Function('module,exports',code)

  var module = {exports:{}}
  require.moduleCache[path] = module.exports  //可循环调用

  var returnValue = modFun(module,module.exports)

  if (return)
}
require.moduleCache = {}