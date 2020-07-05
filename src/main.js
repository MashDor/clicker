import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VuePixi from '../node_modules/vue-pixi/src'
 
Vue.use(VuePixi)

import 'bootstrap'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/style.css';
import "bootstrap/dist/css/bootstrap.min.css"

Vue.config.productionTip = false

Vue.use(BootstrapVue)

new Vue({
  render: h => h(App),
}).$mount('#app')
