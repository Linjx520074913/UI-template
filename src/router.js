import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//以下代码解决路由地址重复点击的报错问题
const originalreplace = Router.prototype.replace
Router.prototype.replace = function replace(location) {
  return originalreplace.call(this, location).catch(err => err)
}

// export default new Router({
//   routes:[
//     { path: '/example0', component: Example0 },
//     { path: '/example1', component: Example1 },
//     { path: '*', component: Example0 }
//   ]
// })
