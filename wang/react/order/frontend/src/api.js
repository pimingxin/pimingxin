import axios from 'axios'

var api = axios.create({
  baseURL:'http://localhost:3000/api',
  withCredentials:true
})

export default api