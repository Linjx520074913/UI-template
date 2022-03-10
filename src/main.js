import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './plugins/element.js'
import VueSocketIO from 'vue-socket.io'
import socketio from 'socket.io-client'
import './assets/defaultstyle.css'
import router from './router'


Vue.config.productionTip = false
Vue.use(new VueSocketIO({
  debug: true,
  connection: socketio.connect('http://127.0.0.1:5010', {
    path: '',
    transports: ['websocket', 'xhr-polling', 'jsonp-polling']
  })
}), store)

new Vue({
  store,
  render: h => h(App),
  router
}).$mount('#app')
