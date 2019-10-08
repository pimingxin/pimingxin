const  express  =  require('express')

const port = 9092

const app = express()

app.get('/',(req,res,next) => {
  res.end('首页')
})
app.get('/question/:id',(req,res,next) => {
  res.end(`${req.params.id}`)
})
app.get('/live/:id',(req,res,next) => {
  res.end(`${req.params.id}`)
})

//precess.env


