const { User }=require('./db')
const express = require('express')

const app = express()
app.use(express.json)
const port = 3002


app.get('/',async (req,res) => {
  res.send('ok')
})

app.post('/register' , async(req,res) => {
  const user = await User.create({
    username:req.body.username,
    password:req.body.password
  })
  res.send(user)
})

app.listen(port,() =>{
  console.log('http://localhost:3002')
})