const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/express' , {
  useNewUrlParser:true,
  useUnifiedTopology: true
})

const User = mongoose.model('User',new mongoose.Schema({
  username:{type:String},
  password:{type:String}
}))

module.exports = {
  User
}