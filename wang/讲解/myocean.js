(function(){

  var seajs = {
    use: function(entryPath){//接收一个入口文件 加载文件后 要加载依赖文件 递归加载
      loadAll(entryPath, () => {//加载完再运行
        require(entryPath)
      })
    }
  }

  var cache = {}

  function loadAll(path , callback){//加载文件 和 依赖
    readFile(path, (sourceCode) =>{
      cache[path] = sourceCode
      var deps = getDeps(sourceCode) // 获取到所有依赖
    })
  }



  function getDeps(sourceCode){

  }


  function readFile(path,done){
    var xhr = new XMLHttpRequest()
    xhr.open('get',path)
    
    xhr.addEventListener('load',()=>{
      done(xhr.responseText) //需要回调
    })
    xhr.send()//因为异步 所以send要在后面
  }
}())