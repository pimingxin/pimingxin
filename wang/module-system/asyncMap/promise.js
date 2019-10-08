import { isError } from "util";
import { futimesSync } from "fs";
import { disconnect } from "cluster";



//promises A promises A+ promises B ES6promises
var p1 = new Promise((resolve,reject) => {
  setTimeout(() => {
    // resolve(reject)
    reject(1)
  }, 3000);
})

p2 = p1.then(val => {
  console.log('resolve')
},reason =>{
  console.log('reject')
})

p3 = p2.then(val => {
  reason()
  console.log(2)
} , reason => {
  console.log(1)
})
// p2


p2 = p1.then()
p2 = p1.then(val => val , reason => {throw reason})

p1
.then(f1)
.then(f2)
.catch(f3)
.then(f4)
.then(f5)


p1
.then(val => {
  return p2.then(g1)
  .then(xx)
  .catch(xxx)
})
.then(f2)
.catch(f3)


Promise.resolve(val)

Promise.resolve = function(val) {
  return new Promise(resolve => {
    resolve(val)
  })

}
// 由一个数组创建一个promise状态 第一个确定状态的promise
Promise.reject = function(val) {
  return new Promise((resolve,reject) => {
    reject(val)
  })
}

Promise.prototype.catch = function(onRejected){
  return this.then(null,onRejected)
}

p2 = p.then(f1,f2).then(null,f4)
p2 = p.then(f1,f2).then(val => val,f4)

p1.catch(f)
p1.then(null,f)

Promise.all = function(promises) {
  return new Promise((resolve,reject) => {
    var res = []
    var count = 0
    for (let i = 0 ; i < promises.length ; i++){
      promises[i].then(val => {
        res[i] = val
        count++
        if (count == promises.length){
          resolve(res)
        }
      },reason => {
        reject(reason)
      })
    }
  })
}


function all(promises) {
  return new Promise((succeed,fail) => {
    var results = [] , pending = promises.length
    promises.forEach((promise,i) => {
      promise.then(result => {
        results[i] = result
        pending -= 1
        if (pengding == 0){
          succeed(results)
        }
      },error => {
        fail(error)
      })
    });
    if (promises.length == 0) {
      succeed(results)
    }
  })
}

function all(promises) {
  return new Promise((resolve,reject) => {
    
    var res = [], count = promises.length
    promises.forEach((promise,i) => {
      promise[i].then(value => {
        res[i] = value
        count--
        if (count == 0) {
          resolve(res)
        }
      },reason => {
        reject(res)
      })
    })
    if (promises.length == 0){
      reject(res)
    }
  })
}



Promise.race = function(values){
  return new Promise((resolve,reject) => {
    for (let i = 0 ; i < values.length ; i++){
      Promise.resolve(values[i]).then(resolve,reject)
    }
  })
}


new Promise = (resolve, reject) =>{
  var xhr = new XMLHttpRequest
  xhr.open('get',url)
  xhr.send()
  xhr.onload(()=>{
    resolve(xhr.responseText)
  })
  xhr.onerror((e) => {
    reject(e)
  })
}

//只要promise被then过 无论状态如何 都比直接console.log慢


//
a().b(c())
p1.then(p2())

doSomething().then(()=> {
  console.log(1)
  return doSomethingElse() //1s
}).then(()=> console.log(2))

// 先1 再1s 再2


doSomething().then(()=> {
  console.log(1)
  doSomethingElse() //1s
}).then(()=> console.log(2))

//1 2 同时打

doSomething().then(()=> doSomethingElse())
//几乎同时开始

doSomething().then(doSomethingElse)
//

p.then(f1)
.then(f2)
.then(f3)
//基本同时运行


//在最后加上一个catch

//then 只接函数 不接promise


function ResolvePromise(x,promise,resolve,reject){

}








//一张一张下载图片

function getImg(url){
  return new Promise((resolve,reject) => {
    var img = new Image()
    img.onload = function (){
      resolve(img)
    }
    img.onerror = function(e){
      reject(e)
    }
    img.scr = url
  })
}
//串行下载

var imgUrls = []
var i = 0

getImg(imgUrls[i++])
.then(()=>{
  return getImg(imgUrls[i++])
})
//loadAll




//对XMLHttpRequest执行promise

function get (url) {
  // Return a new promise
  return new Promise((resolve,reject) => {
    //Do the usual XHR stuff
    var req = new XMLHttpRequest
    req.open('GET',url)
    req.onload(() => {
      // This is called even on 404 etc
      // so check the status
      if (req.status == 200){
        // Resolve the promise with the response text
        resolve(req.response)
      }else{
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        reject(Error(req.statusText))
      }
    })
    // Handle network errors
    req.onerror(() => {
      reject(Error('Network Error'))
    })
    // Make the request
    req.send()
  })
}
//使用
get('story.json').then( response => {
  console.log('Success',response)
}, error => {
  console.error('Failed' , error)
})

// 链式调用
var promise = new Promise ((resolve , reject) => {
  resolve(1)
})
promise.then(val => {
  console.log(val)
  return val + 2
}).then(val => {
  console.log(val)
})

//这里的 response 是 JSON，但是我们当前收到的是其纯文本。 我们可以将 get 函数修改为使用 JSON responseType，不过我们也可以使用 promise 修改使用的代码

get('story.json').then(response => {
  return JSON.parse(response)
  // 必须返回值
}).then(response => {
  console.log(response)
  //此时 这里的response 为JSON格式
})

//可以简写为
get('story.json').then(JSON.parse).then(response => {
  console.log(response)
})
// 可以编写getJSON
function getJSON(url) {
  return get(url).then(JSON.parse)
}

//异步操作队列
getJSON('story.json').then((story) => {
  //拿到整个json
  return getJSON(story.chapterUrls[0])
}).then((chapter1) => {
  console.log('Got chapter 1!' , chapter1)
})

//可以简写为
var storyPromise

function getChapter(i) {
  storyPromise = storyPromise || getJSON('story.json')

  return storyPromise.then((story) =>{
    return getJSON(story.chapterUrls[i])
  })
}

getChapter(0).then((chapter) => {
  console.log(chapter)
  return getChapter(1)
}).then((chapter) => {
  console.log(chapter)
})

//错误处理
get('story.json').then(response => {
  console.log(response)
}).catch(error => {
  console.log(error)
})

//JavaScript 异常和 promise
// 当promise被明确拒绝时 会发生拒绝 如果在回调中发生拒绝的话 则会隐式拒绝

var jsonPromise = new Promise((resolve,reject) => {
  resolve(JSON.parse())
})

jsonPromise.then(data => {
  console.log(data)
}).catch(error => {
  console.log(error)
})

get('/').then(JSON.parse).then(()=>{
  console.log(data)
}).catch(err => {
  console.log(err)
})

//错误处理实践
function addHtmlToPage(str){
  var temp = `<h1>${str}</h1>`
  var error = document.createRange().createContextualFragment(temp)
  document.body.append(error)
}

getJSON('story.json').then((story) => {
  return getJSON(story.chapterUrls[0])
}).then(chapter1 => {
  addHtmlToPage(chapter1.html)
}).catch( () => {
  addHtmlToPage('nmsl')
}).then(() =>{
  document.querySelector('.spinner').style.display = 'none'
})

//不使用promise的版本
try{
  var story = getJSONSync('story.json')
  var chapter1 = getJSONSync(story.chapterUrls[0])
  addHtmlToPage(chapter1.html)
}catch(e){
  addTextToPage('Failed to show chapter')
}
document.querySelector('.spinner').style.display = "none"

//也可以使用getJSON
function getJSON(url) {
  return get(url).then(JSON.parse).catch((error)=>{
    console.log(url,err)
    throw err
  })
}
//并行和串行 和两者兼得
//首先 使用同步的方式来编写代码
try {
  var story = getJSONSync('story.json')
  addHtmlToPage(story.heading)

  story.chapterUrls.forEach( chapterUrl => {
    var chapter = getJSONSync(chapterUrl)
    addHtmlToPage(chpter.html)
  })
}catch(error){
  addTextToPage('error')
}

document.querySelector('.spinner').style.display = 'none'

//使用异步的写法
getJSON('story.json').then(story => {
  addHtmlToPage(story.heading)
}).then(() => {
  addTextToPage('all done')
}).catch((error) => {
  addHtmlToPage('error')
}).then(() => {
  document.querySelector('.spinner').style.display = 'none'
})

//不能使用forEach 如果使用的话 会导致章节混乱 不按顺序

//创建序列
//思路 把chapterUrls 转换成promise序列 然后再一个一个操作

var sequence = Promise.resolve()

story.chapterUrls.forEach(chapterUrl => {
  sequence = sequence.then(()=>{
    return getJSON(chapter)
  }).then(chapter => {
    addHtmlToPage(chapter.html)
  })
})

// 可以将上述代码使用reduce

story.chapterUrls.reduce((sequence,chapterUrl) => {
  return sequence.then(() => {
    return getJSON(chapterUrl)
  }).then((chapter) =>{
    addHtmlToPage(chapter.html)
  })
},promise.resolve())

//汇总起来
getJSON('story.json').then(story => {
  addHtmlToPage(story.heading)
  return story.chapterUrls.reduce((sequence,chapterUrl) => {
    return sequence.then(()=>{
      return getJSON(chapterUrl)
    }).then((chapter) => {
      addHtmlToPage(chapter.html)
    }) 
  })
},promise.resolve()).then(() => {
  console.log('All done')
}).catch((error) => {
  addHtmlToPage('error')
}).then(()=> {
  document.querySelector('.spinner').style.display = 'none'
})

//best
getJSON('story.js').then((story) => {
  addHtmlToPage(story.heading)
  return story.chapterUrls.map(getJSON)
  .reduce((sequence,chapterPromise) => {
    return sequence.then(() => {
      return chapterPromise
    }).then((chapter) => {
      addHtmlToPage(chapter.html)
    })
  },Promise.resolve())
}).then(()=> {
  addTextToPage('all done')
}).catch((error)=> {
  addHtmlToPage(error)
}).then(()=>{
  document.querySelector('.spinner').style.display = 'none'
})


//使用yield来等待promise得到解决
function spawn(generatorFunc) {
  function continuer(verb,arg){
    var result
    try {
      result = generator[verb](arg)
    }catch(e){
      return Promise.reject(err)
    }
    if (result.done){
      return result.value
    } else{
      return Promise.resolve(result.value).then(onFulfilled,onRejected)
    }
  }
  var generator = generatorFunc()
  var onFulfilled = continuer.bind(continuer,'next')
  var onRejected = continuer.bind(continuer,'throw')
  return onFulfilled()
}

//采用显示章节的最后一个最佳实例 结合新的ES6的优势 转变为
spawn(function *(){
  try{
    let story = yield getJSON('story.json')
    addHtmlToPage(story.heading)

    let chapterPromise = story.chapterUrls.map(getJSON)
    //map本来接的参数就是函数
    for (let chapterPromise of chapterUrls) {
      let chapter = yield chapterPromise
      addHtmlToPage(chapter.html)
    }
    addTextToPage('all done')

  }catch(e) {

  }
})






