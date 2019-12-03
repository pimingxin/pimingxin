const express = require('express')

let db
(async function(){
  db = await require('./db')
}())

const app = express.Router()
// 获取桌面信息 如 餐厅名称 桌面名称 将会在langding页面请求并展示
// /deskinfo?rid=5&did=8
// req.query.rid -> 5 req.query.did -> 8

// create table desks ( id integer not null)
app.get('/deskinfo',async (req,res,next) => {
  var desk = await db.get(`SELECT desks.id as did, users.id as uid, desks.name, users.title FROM desks JOIN users ON desks.rid = users.id WHERE desks.id=?`,req.query.did)
  res.json(desk)
})

//返回某餐厅的菜单
// /menu/restaurant/:25
app.get('/menu/restaurant/:rid',async (req,res,next) => {
  var menu = await db.all(`
    SELECT * FROM foods WHERE rid = ? AND status = 'on'
  `,req.params.rid)
  console.log(req.params)
  // params可以获取在数据库中获得对应的信息
  res.json(menu)
})

//用户端下单
app.post('/restaurant/:rid/desk/:did/order',async (req,res,next) => {
  var rid = req.params.rid
  var did = req.params.did

  var deskName = req.body.deskName
  var totalPrice = req.body.totalPrice
  var customCount = req.body.customCount

  var details = JSON.stringify(req.body.foods)
  var status = 'pending'
  var timestamp = new Date().toISOString()

  await db.run(`
    INSERT INTO orders (rid,did,deskName,totalPrice,customCount,details,status,timestamp)
    VALUES (?,?,?,?,?,?,?,?)
  `,rid,did,deskName,totalPrice,customCount,details,status,timestamp)

  var orders = await db.get('SELECT * FROM orders ORDER BY id DESC LIMIT 1')
  order.details = JSON.parse(order.details)
  res.json(orders)
})



//订单管理
app.route('/restaurant/:rid/order')
  .get(async (req,res,next) => {
    var orders = await db.run('SELECT * FROM orders WHERE rid = ? ' , req.cookies.userid)
    orders.forEach(order => {
      order.details = JSON.parse(order.details)
    })
    res.json(orders)
  })

  // 删除订单

app.route('/restaurant/:rid/order/:oid')
  .delete(async (req,res,next) => {

    var order = await db.run('SELECT * FROM orders WHERE rid = ? AND id = ?' , req.cookies.userid,req.params.oid)
    if (order){
      await db.run('DELETE FROM orders WHERE rid = ? AND id = ?' , req.cookies.userid,req.params.oid)
      delete order.id
      res.json(order)
    }else{
      res.status(401).json({
        code : -1,
        msg:'没有此订单或者您无权限操作此订单'
      })
    }

})

//菜品管理api

app.route('/restaurant/:rid/food')
.get(async (req,res,next) =>{
  // 获取所有菜品列表用于在页面中展示
  var foodList = await db.all('SELECT * FROM foods WHERE rid=?' ,req.cookies.userid)

  res.json(foodList)
})
.post(async (req,res,next) => {
  // 增加一个菜品
  await db.run(`
    INSERT INTO foods (rid,name,price,status) VALUES (?,?,?,?)
  `, req.cookies.userid,req.body.name,req.body.price,req.body.status)
  
  var food = await db.get(`SELECT * FROM foods ORDER BY id DESC LIMIT 1`)
  res.json(food)
  
  })

app.route('/restaurant/:rid/food/:fid')
  // 删除菜品判断有无权限删除 应该先去数据库查找是否有相对应的菜品和权限  如果有 才去执行删除 这里不使用try catch 是因为SQL语句 如果删除的是空的话 不会报错 可能导致前端错误的判断
  .delete(async (req,res,next) => {
    var food = await db.get('SELECT * FROM foods WHERE id = ? AND rid = ?' ,req.params.fid,req.cookies.userid)
    if (food){
      await db.run('DELETE FROM foods WHERE id = ? AND rid = ?' , req.params.fid,req.cookies.userid)
      delete food.id
      res.json(food)
    }else{
      res.status(401).json({
        code : -1,
        msg: '不存在此菜品或者您没有权限删除此菜品'
      })
    }
    
  })
  .put(async  (req,res,next) => {

    var fid = req.params.fid
    var userid = req.params.userid

    var food = await db.get('SELECT * FROM foods WHERE id = ? AND rid = ?' ,fid,userid)

    if (food){
      await db.run(`UPDATE foods SET name = ? , price = ? , status = ?
                WHERE id = ? AND rid = ?
      `,
      req.body.name , req.body.price,req.body.status,
      fid,userid
      )
      var food = await db.get('SELECT * FROM foods WHERE id = ? AND rid = ?' ,fid,userid)

      res.json(food)
    }else{
      res.status({
        code:-1,
        msg : '不存在此菜品或您没有权限删除此菜品'
      })
    }
  })

//桌面管理api

app.route('/restaurant/:rid/desk')
.get(async (req,res,next) =>{
  // 获取所有桌面列表用于在页面中展示
  var deskList = await db.all('SELECT * FROM desks WHERE rid=?' , req.cookies.userid)
  res.json(deskList)
  })
  .post(async (req,res,next) => {
    // 增加一个桌子
    await db.run(`
      INSERT INTO desks (rid,name,capacity) VALUES (?,?,?)
    `,req.cookies.userid , req.body.name , req.body.capacity)

    var desk = await db.get('SELECT * FROM desks ORDER BY id DESC LIMIT 1')

    res.json(desk)
  })

app.route('/restaurant/:rid/desk/:did')
  .delete(async (req,res,next) => {
    var did = req.params.did
    var userid = req.cookies.userid

    var desk = await db.get(`SELECT * FROM desk WHERE id = ? AND rid = ?`,did,userid)
    if (desk){
      await db.run('DELETE FROM desks WHERE id = ? AND rid = ?' , did,userid)
      delete desk.id
      res.json(desk)
    }else{
      res.status(401).json({
        code : -1,
        msg : '不存在此桌面或您没有权限删除此桌面'
      })
    }
  })
  .put(async (req,res,next) => {
    var did = req.params.did
    var userid = req.cookies.userid

    var desk = await db.get('SELECT * FROM desk WHERE id = ? AND rid = ?' , did,userid)
    if (desk){
      await db.run(`
        UPDATE desks SET name = ? , capacity = ? 
         WHERE id = ? AND rid = ?
      `, req.body.name , req.body.capacity,did,userid
      )
      var desk = await db.get('SELECT * FROM desk WHERE id = ? AND rid = ?', fid , userid)
      res.json(desk)
    }else{
      res.status(401).json({
        code : -1,
        msg:'不存在此桌面或您没有权限删除此桌面'
      })
    }
  })

module.exports = app