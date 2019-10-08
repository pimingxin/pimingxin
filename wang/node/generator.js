import { resolve } from "dns";

function * natureNumber(n){
	for (var i = 0 ; i < n ; i++){
		var x = yield i
		console.log(x)
	}
}

iterable = natureNumber(10)
/*
函数创建好之后 并没有运行

直到调用next()的时候 运行函数遇到yield的时候 并且把yield后面的表达式生成出来

这个时候 是暂停在yield这句话这里的

yield语句本身并没有被返回

yield可以把自己的值赋给别人

done为true的时候 这个时候的value是函数的返回值 通过return返回的

第一次调用next() 里面传值是没用的 因为natureNumber的内部是suspended

如果next()调用不是第一次 里面还有值的话 

那么x将会等于这个值 但value是i

如果使用return的话 

yield的value则会变为return后的这个值 done 为true

上例中 console.log将不会打印出结果

unref()//让该timer的未执行状态 程序结束

ref
*/


function squareAsync(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x * x)
    }, 1000);
  })
}


//引入 asunc
async function foo(){
  var a = await squareAsync(5)
  console.log(a)
}

foo().then(val => {
  console.log(val)
})
//

run(function * foo() {
  var x = yield squareAsync(2)
  console.log(x)
  var x = yield squareAsync(4)
  console.log(x)
  var x = yield squareAsync(6)
  console.log(x)
  var x = yield squareAsync(8)
  console.log(x)
}).then(()=>{
  console.log('All done')
})


iter.next().value.then(val => {
  iter.next(val).value.then(val => {
    iter.next(val).value.then(val => {
      iter.next(val)
    })
  })
})



function run(g){
  return new Promise((resolve,reject) => {
    var iter = g()
    
    var generated
    try{
      generated = iter.next()
    }catch(e){
      reject(e)
    }
    
    star()
    
    function start(){
      if (!generated.done){
        generated.value.then(val => {
          try{
            generated = iter.next(val)
          }catch(e){
            reject(e)
          }
          start()
        },reason => {
          try{
            generated = iter.throw(reason)
          } catch(e){
            reject(e)
          }
          start()
        })
      }else{
        Promise.resolve(generated.value).then(resolve,reject)
      }
    }
  })
}

