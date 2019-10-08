var express = require('express')
var app = express()
//请求 响应
app.get('/',(req,res) => {
  res.send('Hello World')
})

app.listen(3000, () => {
  console.log('fuck')//cb
})



const port = 8080


//每一个都是中间件 


//next
app.use((req,res,next) => {
  res.redirect(301,'location')//跳转 响应
})
app.use((req,res,next) => {
  
})
app.use((req,res,next) => {
  
})
app.use((req,res,next) => {
  
})







app.use((req,res,next) => {
  console.log(req.method,req.url)
  next()
})

app.use((req,res,next) => {
  if (req.method == 'GET'){
    res.end('hello')
  }
  next()
})

// 静态文件服务器 
app.use(async (req,res,next) => {
  var path = require('path')
  var base = './'
  var targetpath = path.join(base,req.url)
  var fsp = require('fs').promises
  try{
    var stat = await fsp.stat(targetpath)
    if (stat.isFile()){
      fsp.createReadStream(targetpath)
    }else{
      next()
    }
  } catch(e){
    next()
  }
})

app.use((req,res,next) => {
  var bodyStr = ''
  req.on('data',data => {
    bodyStr += data.toString()
  })
  req.on('end',() => {
    if (req.is('json')){
      req.body = JSON.parse(bodyStr)
    }else if (req.is('urlencoded')){
      req.body = url.parse(bodyStr)
    }else{
      req.body = bodyStr
    }
    next()
  })
})


app.use((req,res,next) => {
  if (req.method == 'POST'){
    res.end('hello')
  }
  next()
})

app.listen(port,()=> {
  console.log()
})

//类似QUEUE
var fns = [
  next => {
    console.log(1)
    setTimeout(next, 1000);
  },
  next => {
    console.log(2)
    setTimeout(next,1000)
  },
  next => {
    console.log(3)
    setTimeout(next,1000)
  },
  next => {
    console.log(4)
    setTimeout(next,1000)
  }
]

//不带参数
var composed = fns.reduceRight((previousNext,f) => {
  return function next(){
    f(previousNext)
  }
},() => {})

//带参数
function compose(mws) {
  return mws.reduceRight((prev,mv) => {
    return function (req,res) {
      mw(req,res,function next (){
        prev(req,res)
      })
    }
  },function next(){})
}

