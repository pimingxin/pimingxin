const { Readable,Writable,Transform } = require('stream')
const fs = require('fs')

exports.createReadStream = function createReadStream(path){
  var fd = fs.openSync(path,'r')
  var position = 0
  var flieStat = fs.statSync(path)
  var fileSize = flieStat.size

  return new Readable({
    read(size){
      var buf = Buffer.alloc(1024)
      if (position >= fileSize){
        this.push(null)
        fs.close(fd,(err) => {
          if (err){
            console.log(err)
          }
        })
      }else{
        fs.read(fd,buf,0,1024,position, (err , bytesRead)=>{
          if (err){
            console.log(err)
            return 
          }
          
          if (bytesRead < 1024) {
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

exports.createWritableStream = function createWritableStream(path){
  var fd = fs.openSync(path,'+')
  var position = 0
  return new Writable ({
    write(chunk,encoding,done){
      fs.write(fd,chunk, 0 , chunk.length , position , () =>{
        done()
      })
      position += chunk.length
    }
  })
}

exports.createTransformStream = function createTransformStream(){
  return new Transform({
    transform(chunk,encoding,callback){
        fs.write(chunk.toString().toUpperCase(),() => {
          callback()
          this.end()
        })
    }
  })
}

createReadStream('C:/Users/Administrator/Desktop/github/wang/node/Hello.txt').pipe(createTransformStream).pipe(createWritableStream('C:/Users/Administrator/Desktop/github/wang/node/Hello1.txt'))