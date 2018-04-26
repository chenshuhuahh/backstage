// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import store from './vuex/store';
import axios from 'axios';
import ElementUI from 'element-ui';
import vueQuillEditor from 'vue-quill-editor'; // 引入富文本工具
import studentInfo from './components/studentInfo.vue';
import companyInfo from './components/companyInfo.vue';
import workInfo from './components/workInfo.vue';

import 'element-ui/lib/theme-chalk/index.css'; // element-ui的样式
import 'element-ui/lib/theme-chalk/display.css';
import './common/styles/index.scss'; // 自己设计的样式
import 'quill/dist/quill.core.css'; // 富文本编辑器的样式
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

Vue.prototype.$ajax = axios;
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(vueQuillEditor);

Vue.config.productionTip = false;

// 定义路由
const routes = [
  {
    path: '/studentInfo',
    component: studentInfo
  },
  {
    path: '/companyInfo',
    component: companyInfo
  },
  {
    path: '/workInfo',
    component: workInfo
  }
];

// 创建router实例
const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'active',
  scrollBehavior (to, from, savedPosition) {
    // 如果你的連結是帶 # 這種
    // to.hash 就會有值(值就是連結)
    // 例如 #3
    if (to.hash) {
      return {
        // 這個是透過 to.hash 的值來找到對應的元素
        // 照你的 html 來看是不用多加處理這樣就可以了
        // 例如你按下 #3 的連結，就會變成 querySelector('#3')，自然會找到 id = 3 的元素
        selector: to.hash
      };
    } else {
      // 所有路由新页面滚动到顶部：
      return {x: 0, y: 0};
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});

// 编程式导航
router.push({path: '/workInfo'});
