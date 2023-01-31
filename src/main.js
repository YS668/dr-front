import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import './assets/global.css';
import "./axios"
import axios from "axios";

Vue.config.productionTip = false
Vue.prototype.$axios = axios

Vue.use(ElementUI);

new Vue({
  el: '#app',
  render: h => h(App)
});
