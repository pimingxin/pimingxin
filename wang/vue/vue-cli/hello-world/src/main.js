import Vue from 'vue'
import App from './App.vue'
import Button from 'antd/dist/antd.css'
import 'antd/dist/antd.css'

Vue.component(Button.name,Button)

Vue.config.productionTip = false

new Vue({
  el:'#app',
  component:{ App },
  template:'<App />'
})