
function require(path) {
  if (require.moduleCache.hasOwnProperty(path)) {
    return require.moduleCache[path]
  }

  var code = readFile(path)
  var modFun = new Function('module,exports',code)

  var module = {exports:{}}
  require.moduleCache[path] = module.exports
  
  var returnValue = modFun(module,module.exports)

  if (returnValue === undefined){
    readFile.moduleCache[path] = module.exports
  }else{
    readFile.moduleCache[path] = returnValue
  }
  return require.moduleCache[path]
}
require.moduleCache = {}

function readFile(path,done) {
  var xhr = new XMLHttpRequest() 
  xhr.open('GET', path)
  xhr.addEventListener('load' , () => {
    done(xhr.responseText)
  })
  xhr.send()
}