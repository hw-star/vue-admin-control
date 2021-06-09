import Vue from 'vue'

import 'normalize.css/normalize.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

import Print from 'vue-print-nb'
Vue.use(Print); 

import '@/icons' // icon
import '@/permission'

/**
 *
 * 生产环境 移除 
 * if (process.env.NODE_ENV === 'production') {
 * const { mockXHR } = require('../mock')
 * mockXHR()
 *}
 */

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
