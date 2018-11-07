import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import {
  routes
} from './route/route'
import {
  store
} from './store/store.js'
Vue.config.productionTip = false

const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior(to, from, savePosition) {
    if (savePosition) {
      return savePosition;
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
});

router.beforeEach((to, from, next) => {
  if (to.path == '/login' || to.path == '/register') {
    next();
  } else {
    if (store.getters.isLogin) {
      next();
    } else {
      alert('请先登录');
      next('/login');
    }

  }
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')