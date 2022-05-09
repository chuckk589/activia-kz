import 'core-js/stable';
import Vue from 'vue';
import CoreuiVuePro from '@coreui/vue-pro/src/index.js';
import App from './App';
import router from './router/index';
import { iconsSet as icons } from './assets/icons/icons.js';
import store from './store';
import axios from 'axios';

Vue.use(CoreuiVuePro);
Vue.prototype.$log = console.log.bind(console);
Vue.prototype.$http = axios;
Vue.prototype.$http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status == 401 && error.response.config.url !== '/auth/login') {
      router.push('login');
    }
    return Promise.reject(error);
  },
);
Vue.prototype.$http.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
  return config;
});

new Vue({
  el: '#app',
  router,
  store,
  //CIcon component documentation: https://coreui.io/vue/docs/components/icon
  icons,
  template: '<App/>',
  components: {
    App,
  },
  mounted: function () {
    this.$http({ method: 'GET', url: `/v1/status/` }).then((e) => {
      Vue.prototype.$ctable = e.data;
      console.log(Vue.prototype.$ctable);
    });
  },
});
