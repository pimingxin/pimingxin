const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const sqlite = require('sqlite')
const userAccountMiddleware = require('./user-account')
const restaurantMiddleware = require('./restaurant')

const port = 3005

const app = express()

app.use(cors({
  origin:true,//是否允许跨域
  maxAge:86400, // 最大过期时间 以秒为单位
  credentials:true, // 允许带cookies包含在跨域请求中
}))

app.use(express.static(__dirname + '/static'))

app.use(express.urlencoded({
  extended:true
}))

app.use(express.json())

app.use(cookieParser('secret'))//cookie前面使用的密码

app.use('/api',userAccountMiddleware)

app.use('/api',restaurantMiddleware)

app.listen(port , () => {
  console.log(port)
})