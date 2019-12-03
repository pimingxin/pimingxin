const fs = require('fs')
const multer = require('multer')
const express = require('express')
// const sharp = require('sharp')
// const svgCaptcha = require('svg-captcha')
const fsp = fs.promises
const uploader = multer({
  dest:'./upload',
  preservePath:true,
})

let db
(async function(){
  db = await require('./db')
}())

const changePasswordTokenMap = {}
const mailer = require('./mailer')

const app = express.Router()

app.route('/register')
  .post(uploader.single('avatar'), async(req,res,next) => {
    var regInfo = req.body

    var user = await db.get('SELECT * FROM users WHERE name=?' , regInfo.name)
    if (user){
      if (req.file){
        await fsp.unlink(req.file.path)
      }
      res.status(401).json({
        code:-1,
        mag:'用户名已被占用'
      })
    }else{
      await db.run('INSERT INTO users (name, email, password,title) VALUES (?,?,?,?)',
        regInfo.name, regInfo.email , regInfo.password , regInfo.title
      )
      res.json({
        code:0,
        msg:'注册成功'
      })
    }
  })
  
  app.get('userinfo' , async(req,res,next) => {
    var userid = req.signedCookies.userid
    if (userid){
      res.json(await db.get('SELECT id,name,title FROM users WHERE id=?',userid))
    }else{
      res.status(404).json({
        code:-1,
        msg:'不存在此餐厅'
      })
    }
  })

  app.route('/login')
    .post(async (req,res,next) => {
      var tryLoginInfo = req.body
      var user = await db.get('SELECT * FROM users WHERE name=? AND password=?',
        tryLoginInfo.name, tryLoginInfo.password
      )
      if (user){
        res.cookie('userid' , user.id 
        // , {
        //   signed:true
        // }
        )
        res.json({code:0,msg:'登录成功'})
      }else{
        res.json({code:-1,msg:'用户名或密码错误'})
      }
    })
  app.get('/logout' , (req,res,next) => {
    res.clearCookie('userid')
    res.json({
      code:0,
      msg:'登出成功'
    })
  })

  module.exports = app