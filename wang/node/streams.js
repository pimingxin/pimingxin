const fs = require('fs')
var crypto = require('crypto')
var file = 'C:/Users/Administrator/Desktop/github/wang/node/2.jpg'

const zlib = require('zlib')


var compressStream = zlib.createGzip()

var rs = fs.createReadStream(file)
var ws = fs.createWriteStream('3.gz')


// var ws = fs.createWriteStream('3.jpg',{
//   highWaterMark:65536//默认 以字节为单位
// })

// rs.on('data' , data => {
//   if (ws.write(data) == false){
//     rs.pause()
//   }
// })

//枯竭

// ws.on('drain',()=>{
//   rs.resume()
// })

rs.pipe(compressStream).pipe(ws)

//双工流 转换流 压缩流 连接流 

/*
data
drain
end
pause
resume

*/ 
//实现pipe
ReadableStream.prototype.pipe = function(writable) {
  var rs = this
  rs.on('data',data => {
    writable.write(data)
    if (writable.write(data) === false){
      rs.pause()
    }
  })
  rs.on('end',()=>{
    writable.end()
  })
  writable.on('drain',()=> {
    rs.resume()
  })
  return writable
}

//实现Stream

const stream = require('stream')

const {Readable,Writable,Duplex,Transform,} = stream

var myrs = new Readable({//随机生成随机数字
  highWaterMark: 1,
  read(size) {
    setTimeout(() => {
      var char = Math.random().toString().slice(2,3)
      this.push(char)
    }, 200);
  }
})

myrs.on('data' , data => {
  console.log(data)
})

var myws = new Writable({
  write(chunk,encoding,done){
    setTimeout(() => {
      console.log(chunk.toString())
      done()
    }, 500);
  }
})

var mytf = new Transform({
  transform(chunk, encoding, callback){
    this.push(chunk.toString().toUpperCase())
    callback()
  }
})

function split() {
  
  var lastHalfLine = ''
  return new Transform({
    objectMode:true,
    transform(chunk,encoding,callback){
      var lines = chunk.toString().split('\r\n')
      if (lines.length > 1){
        var lastLine = lines.pop()
        if (lastLine != ''){
          lastHalfLine = lastLine
        }
        lines.push(lastLine)
        this.push(lines[0] + lastHalfLine)
        lastHalfLine = ''
        for (var i = 1 ; i < lines.length ; i++) {
          this.push(lines[i].toString())//经过处理的字符串都会变化成bugffer
          callback()
        }
      }else{
        lastHalfLine = lines[0]
      }
    }
  })
}



myrs.pipe(myws)


class Compress extends Transform {
  constructor(){

  }
  _transform(chunk,encoding,callback){
    this.push(process(chunk))
  }
}

class TCPConnet extends Readable {
  constructor(){

  }
  _read(size){
    this.push()
  }
}

class TCPConnet extends Duplex {
  constructor(){

  }
  _write(chunk,encoding,done){

  }
}



//慢慢读文件
module.exports = function createReadStream(path){
  var fd = fs.openSync(path,'r')
  var fileStat = fs.statSync(path)
  var fileSize = fileStat.size
  var position = 0

  return new Readable({
    read(size) {
      var buf = Buffer.alloc(1024)
      if (position >= fileSize){
        this.push(null)
        fs.close(fd , (err) => {
          if (err){
            console.log(err)
          }
        })
      }else{
        fs.read(fd,buf,0,1024,position, (err,bytesRead)=> {
          if (bytesRead < 1024){
            this.push(buf.slice(0,bytesRead))
          }else{
            this.push(buf)
          }
        })
        position += 1024

      }
    }
  })
}


//上课内容

const fs = require('fs')
var crypto = require('crypto')
var file = 'C:/Users/Administrator/Desktop/github/wang/node/2.jpg'

const zlib = require('zlib')


var compressStream = zlib.createGzip()

var rs = fs.createReadStream(file)
var ws = fs.createWriteStream('目标路径',{
  highWaterMark:1024*1024*100 // 
})

rs.on('data',data => {
  if (compressStream.write(data) == false){
    rs.pause()
  }
})

compressStream.on('drain',()=> {
  rs.resume()
})

compressStream.on('data' , data => {
  if (ws.write(data) == false){
    compressStream.pause()
  }
})

ws.on('drain',data => {
  ws.resume()
})


/*
Readable
on('data')被动
on('end')
on('readable',)自身缓冲区有准备好的数据时触发
pause()
resume()
destory()


pipe(writable)

Writable
destory()
write()
end()
on('drain')  缓存区数据消耗完的时候触发 让可读流既继续触发
on('finish') end之后缓冲区全部数据处理完的时候触发
*/