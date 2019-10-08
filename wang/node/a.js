'use strict'

var fs = require('fs')

// fs.readFile('2.jpg',(err,data) => {
//   if (err){
//     console.log(err)
//   }else{
//     console.log(data)
//     console.log(data.length + ' bytes')
//   }
// })

// var data = 'Hello Node.js'
// fs.writeFile('output.txt',data,err =>{
//   if (err){
//     console.log(err)
//   }else{
//     console.log('ok')
//   }
// })

// var rs = fs.createReadStream('Hello.txt','utf-8')

// rs.on('data',chunk =>{
//   console.log('DATA')
//   console.log(chunk)
// })

// rs.on('end',()=>{
//   console.log('END')
// })

// rs.on('error',err => {
//   console.log(err)
// })

//data事件可能会触发措辞 每次传递的chunk是流的一部分

var ws1 = fs.createWriteStream('Hello1.txt','utf-8')

//写入文本数据
ws1.write('nmslnmsl\n')
ws1.write('End')
ws1.end()


var ws2 = fs.createWriteStream('Hello2.txt')
//写入二进制数据
ws2.write(new Buffer('二进制\n','utf-8'))
ws2.write(new Buffer('END','utf-8'))
ws2.end()

//用pipe()把一个文件流和另一个文件流串起来，这样源文件的所有数据就自动写入到目标文件里了，所以，这实际上是一个复制文件的程序
var rs = fs.createReadStream('sample.txt')
var ws = fs.createWriteStream('copied.txt')

rs.pipe(ws)

//默认情况下 当readable流的数据读取完毕 end事件触发 将自动关闭writeable
// 如果不希望自动关闭wirteable流需要传入参数

readable.pipe(writable,{end:false})

/*

http模块提供的request和response对象。

request对象封装了HTTP请求，我们调用request对象的属性和方法就可以拿到所有HTTP请求的信息；

response对象封装了HTTP响应，我们操作response对象的方法，就可以把HTTP响应返回给浏览器。
*/

//解析URL需要用到Node.js提供的url模块，它使用起来非常简单，通过parse()将一个字符串解析为一个Url对象：

var url = require('url')

