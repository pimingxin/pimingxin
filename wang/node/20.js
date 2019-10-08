// var http = require('http')
// http.createServer((req,res) => {
//   res.writeHead(200,{
//     'Conent-Type' : 'text/plain'
//   })
//   req.on('data' , data => {
//     res.write(data.toString().toUpperCase())
//   })
//   req.on('end' , () => {
//     res.end()
//   })
// }).listen(8090)


const stream = require('stream')
const { Readable,Writable,Transform } = stream

var myrs = new Readable({
  highWaterMark: 10,
  read(size){
    setTimeout(() => {
      var char = Math.random().toString().slice(2,3)
      this.push(char)
    }, 500);
  }
})
//函数名无法重复
var myws = new Writable({
  write(chunk,encoding,done){
    setTimeout(() => {
      console.log(chunk.toString())
      done()
    }, 100);
  }
})

var mytf = new Transform({
  transform(chunk,encoding,callback){
    this.push(chunk.toString().toUpperCase())
    callback()
  }
})




// myrs.on('data' , data => {
//   console.log(data.toString())
// })

//暂停
myrs.on('pause', ()=> {
  console.log('rs pause')
})

//恢复
myrs.on('resume',() => {
  console.log('rs resume')
})
//枯竭
myws.on('drain',()=>{
  console.log('ws drained')
})
myrs.pipe(mytf).pipe(myws)




//如果需要使用readableq的话 可以使用继承 写在继承里面的函数需要加上下划线
// class a extends Readable {
//   constructor() {

//   }
//   _read(size){

//   }
// }



var { Transform } = require('stream')