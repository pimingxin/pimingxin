function asyncMap(ary,asyncMapper,callback){
  var res = []
  var count = 0 
  for (let i = 0 ; i < ary.length ; i++){
    asyncMapper(ary[i],(mapped)=>{
      res[i] = mapped
      count++
      if (count == ary.length){
        callback(null,res)
      }
    })
  }
}
// mapper是asyncMapper的回调
// callback 是 asyncMap 的回调

function asyncFilter(ary,filterFunc,done){
  var res = []
  var count = 0
  for (let i = 0 ; i < ary.length ; i++) {
    filterFunc(ary[i],(cb) =>{
      if (cb){
        res[i] = ary[i]
      }
      count++
      if (count == ary.length){
        var result = []
        for (var a in res){
          result.push(res[a])
        }
        done(result)
      }
    })
  }
}
function asyncFilter(ary,filterFunc,done){
  var res = []
  var count = 0
  for (let i = 0 ; i < ary.length ; i++) {
    filterFunc(ary[i],(cb) =>{
      if (cb){
        res.push(ary[i])
      }
      count++
      res.sort(a,b => {
        return a + b
      })
      if (count == ary.length){
        done(res)
      }
    })
  }
}


function asyncEvery(ary,everyFunc,callback){
  var res = false
  var count = 0
  for (let i = 0 ; i < ary.length ; i++){
    everyFunc(ary[i], (cb) =>{
      if (cb){
        count++
        if (count == ary.length){
          callback(true)
        }
      }else{
        if(!res){
          callback(false)
          res = true
        }
      }
    })
  }
}


function asyncSome(ary,someFunc,callback){
  var res = false
  var count = 0
  for (let i = 0 ; i < ary.length ; i++){
    everyFunc(ary[i], (cb) =>{
      if (!cb){
        if(!res){
          callback(true)
          res = true
        }
      }else{
        count++
        if (count >= ary.length){
          callback(false)
        }
      }
    })
  }
}

class Queue2{
  constructor(maxParallel = 1){
    this.maxParallel = maxParallel
    this.tasks = []
    this.runningCount = 0
  }
  add(f){
    var next 
    if (this.runningCount < this.maxParallel){
      this.runningCount++
      f(next = () => {
        if (this.tasks.length) {
          var nextTask = this.tasks.shift()
          nextTask(next)
        }else{
          this.runningCount--
        }
      })
    } else {
      this.tasks.push(f)
    }
    return this
  }
}