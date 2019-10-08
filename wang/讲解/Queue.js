

class Queue {
  constructor(){
    this.tasks = [] // 保存
    this.hasRunning = false
  }
  add(f){
    var next
    if (!this.hasRunning){//如果函数正在运行 就不能执行next
      this.hasRunning = true
      f(next = () =>{//箭头函数里的应该不允许使用this 由于题目要求 next的this应该是constructor里的this 
        if (this.tasks.length){//如果数组里还有未完成的函数 才运行nex
          var nextTask = this.tasks.shift()//将函数移出来
          nextTask(next)//然后执行 再继续等待执行next
        }else{
          this.hasRunning = false//最后一个函数执行完毕 后面没有等待的函数了
        }
      })
    }else{
      this.tasks.push(f)//如果正在运行 先把函数放进tasks数组
      //依次push进数组 第一个不push
      console.log(this.tasks)
    }
    return this // 为了能够链式调用
  }
}

















new Queue()

.add(function f1(next){
  console.log(1)
  setTimeout(() => {
    next()
  }, 2000);
}).add(function f2(next){
  console.log(2)
  setTimeout(() => {
    next()
  }, 2000);
}).add(function f3(next){
  console.log(3)
  setTimeout(() => {
    next()
  }, 2000);
}).add(function f4(next){
  console.log(4)
  setTimeout(() => {
    next()
  }, 2000);
})