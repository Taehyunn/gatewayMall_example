import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import VueHtmlToPaper from "vue-html-to-paper";
import "core-js/stable";
import "regenerator-runtime/runtime";

import VuetifyDialog from "vuetify-dialog";
import Vue2Editor from "vue2-editor";

import common from "./common/fn_common";

////////////////////<<탭 이동후 다시 돌아왔을 때 alert 보여준다.>>/////////////////////////////////////////
// import visibility from 'vue-visibility-change';

// registry directive
// Vue.use(visibility);

// global mode
// const handler = visibility.change((evt, hidden) => {
//   // do something
//   if(hidden == true) {
//     alert("하이");
//     console.log(evt);
//     console.log(hidden);
//   }
//
//
// });
// visibility.isSupported(handler);
//////////////////////////////////////////////////////////////

//Alert 컴포넌트를 전역에서 사용할 수 있도록 준비
Vue.component("AlertDialog", () => import("@/views/Components/AlertDialog.vue"));
// Vue.component("ProgressCircular", () => import("@/views/Components/ProgressCircular.vue"));

Vue.use(Vue2Editor);

Vue.use(common);

Vue.use(VuetifyDialog, {
  context: {
    vuetify,
  },
});

const printOption = {
  name: "_blank",
  specs: ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"],
  styles: [
    "https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css",
    "https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css",
    "https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900",
  ],
  timeout: 1000, // default timeout before the print window appears
  autoClose: true, // if false, the window will not close after printing
  windowTitle: window.document.title, // override the window title
};

Vue.use(VueHtmlToPaper, printOption);

Vue.config.productionTip = false;

//real world component 는 일단 보류
// import ApiService from "./common/api.serivice";
// ApiService.init();

//Axios 기본 Interceptor 적용

axios.interceptors.request.use((config) => {
  let gType = window.localStorage.getItem('selectedGame');

  if(gType === '2WinChance') {
    // config.baseURL = 'http://192.168.0.205:8081/'
    config.baseURL = process.env.VUE_APP_API_BASE_URL_TWOWINCHANCE;
    console.log('인터셉터 작용중임 === 2WinChance');

  }else if(gType === '2WinPlus') {
    // config.baseURL = 'http://localhost:8082/'
    config.baseURL = process.env.VUE_APP_API_BASE_URL_TWOWINPLUS;
    console.log('인터셉터 작용중임 === 2WinPlus');
  }

  return config
},(error => {
  return Promise.reject(error);
})
)

// axios.defaults.baseURL = VUE_APP_LOCAL_URI;
// axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;
// axios.defaults.withCredentials = true;






new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
