import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import animated from 'animate.css'
import CircleMenu from 'vue-circle-menu'

import querystring from 'querystring'

Vue.prototype.$qs = querystring;

Vue.component('CircleMenu', CircleMenu)
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(animated)
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
