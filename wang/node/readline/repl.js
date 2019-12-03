const repl = require('repl')
const axios = require('axios')

repl.start({
  prompt: '请输入要查询的城市: ',
  eval:async function(city,context,filename,callback){
  var data = (await axios.get(`http://api.jirengu.com/getWeather.php?city=${city}`)).data
  callback(null,data.results[0].weather_data[0].date)
}})
//eval 第一个参数 用户输入的东西