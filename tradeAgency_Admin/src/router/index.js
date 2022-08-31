import Vue from "vue";
import VueRouter from "vue-router";
// import store from "@/store/index.js";
import Home from "@/views/Home.vue";
import Login from "@/views/Login";
import AddRegister from "@/views/AddRegister";

import CodeList from "@/views/CodeList";

import BoardList from "@/views/Notice/BoardList";
import LandingMain from "@/views/Landing_Main";
import ReportDaily from "@/views/Report/ReportDaily";
import ReportWeekly from "@/views/Report/ReportWeekly";
import ReportMonthly from "@/views/Report/ReportMonthly";
import TicketView from "@/views/TicketView";
import EventView from "@/views/EventView";
import ProductView from "@/views/ProductView";
import MngMenu from "@/views/MngMenu";
import MemberView from "@/views/MemberView";
import PaymentView from "@/views/PaymentView";
import CommonCode from "@/views/CommonCode";
import CommonCodeMiddle from "@/views/CommonCodeMiddle";
import JobManagement from "@/views/JobManagement";
import JobLog from "@/views/JobLog";
import BannerView from "@/views/BannerView";
import CommunityView from "@/views/CommunityView";
import PaymentFromAdmin from "@/views/PaymentFromAdmin";
import ContestView from "@/views/ContestView";
// import TestCategory from "@/views/TestCategory";
import MemberView_TwoWin from "@/views/TwoWinPlus/MemberView";
import ItemView_TwoWin from "@/views/TwoWinPlus/ItemView";
import GameIntroduceView_TwoWin from "../views/TwoWinPlus/GameIntroduceView";


Vue.use(VueRouter);

// const exitBrowser = () => (to, from, next) => {
//   console.log("브라우저 종료 ");
//   alert("브라우저 종료 ");
//   const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
//   if (answer) {
//     next()
//   } else {
//     next(false)
//   }
// }


//NavigationDuplicated error 방지를 위한 전역 설정 ============
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => {
    if (err.name != "NavigationDuplicated") throw err;
  });
};
//=========================================================

const requireLoginCheck = () => (to, from, next) => {
  //store 에 있는 값을 불러오면 에러가 나서 아래처럼 처리함.
  if (window.localStorage.getItem("userName") !== null) {
    return next();
  }
  next("/login");
};


let routes = [
  {
    path: "/paymentAdmin",
    name: "PaymentFromAdmin",
    component: PaymentFromAdmin,
    beforeEnter: requireLoginCheck(),



  }, {
    path: "/contest",
    name: "ContestView",
    component: ContestView,
    beforeEnter: requireLoginCheck(),


  },
  {
    path: "/addRegister",
    name: "AddRegister",
    component: AddRegister,
    beforeEnter: requireLoginCheck(),
  },
  {
    path: "/community",
    name: "CommunityView",
    component: CommunityView,
    beforeEnter: requireLoginCheck(),
  },
  {
    path: "/banner",
    name: "BannerView",
    component: BannerView,
    beforeEnter: requireLoginCheck(),
  },
  {
    path: "/joblog",
    name: "JobLog",
    component: JobLog,
    beforeEnter: requireLoginCheck(),
  },
  {
    path: "/jobManagement",
    name: "JobManagement",
    component: JobManagement,
    beforeEnter: requireLoginCheck(),
  },
  {
    path: "/commoncode",
    name: "CommonCode",
    component: CommonCode,
    beforeEnter: requireLoginCheck(),
  },
  {
    path: "/CommonCodeMiddle",
    name: "CommonCodeMiddle",
    component: CommonCodeMiddle,
    beforeEnter: requireLoginCheck(),
  },
  {
    path: "/payment",
    name: "PaymentView",
    component: PaymentView,
    beforeEnter: requireLoginCheck(),
  },
  {
    path: "/member",
    name: "MemberView",
    component: MemberView,
    beforeEnter: requireLoginCheck(),
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/mngMenu",
    name: "MngMenu",
    component: MngMenu,
    // meta: { requireLogin: true,},
    beforeEnter: requireLoginCheck(),
  },

  {
    path: "/product",
    name: "ProductView",
    component: ProductView,
    // meta: { requireLogin: true },
    beforeEnter: requireLoginCheck(),
  },
  {
    path: "/event",
    name: "EventView",
    component: EventView,
    // meta: { requireLogin: true },
    beforeEnter: requireLoginCheck(),
  },
  {
    path: "/report",
    name: "ReportDaily",
    component: ReportDaily,
    // meta: { requireLogin: true },
    beforeEnter: requireLoginCheck(),
  },
  {
    path: "/report/reportWeekly",
    name: "ReportWeekly",
    component: ReportWeekly,
    // meta: { requireLogin: true },
    beforeEnter: requireLoginCheck(),
  },
  {
    path: "/report/reportMonthly",
    name: "ReportMonthly",
    component: ReportMonthly,
    // meta: { requireLogin: true },
    beforeEnter: requireLoginCheck(),
  },
  {
    path: "/landingMain",
    name: "Landing_Main",
    component: LandingMain,
    //실행 이상 없음
    // component: () => import("@/views/Landing_Main"),
    // meta: { requireLogin: true },
    beforeEnter: requireLoginCheck(),
    // beforeRouteLeave: exitBrowser(),
  },
  {
    path: "/boardList",
    name: "BoardList",
    component: BoardList,
    // meta: { requireLogin: true },
    beforeEnter: requireLoginCheck(),
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    // meta: { requireLogin: true },
    //session 이 없으면 login 페이지로 이동
    beforeEnter: requireLoginCheck(),
  },

  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/codeList",
    name: "CodeList",
    component: CodeList,
    // meta: { requireLogin: true },
    //session 이 없으면 login 페이지로 이동
    beforeEnter: requireLoginCheck(),
  },

  {
    path: "/ticket",
    name: "TicketView",
    component: TicketView,
    // meta: {requireLogin: true,},
    beforeEnter: requireLoginCheck(),
  },
  // {
  //   path: "/TestCategory",
  //   name: "TestCategory",
  //   component: TestCategory,
  //   // meta: {requireLogin: true,},
  //   beforeEnter: requireLoginCheck(),
  // },
  {
    path: "/twowinplus/webMemberList",
    name: "MemberView_TwoWin",
    component: MemberView_TwoWin,
    beforeEnter: requireLoginCheck(),
  },{
    path: "/twowinplus/mngItem",
    name: "ItemView_TwoWin",
    component: ItemView_TwoWin,
    beforeEnter: requireLoginCheck(),
  },{
    path: "/twowinplus/GameIntroduceList",
    name: "GameIntroduceView_TwoWin",
    component: GameIntroduceView_TwoWin,
    beforeEnter: requireLoginCheck(),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});



//beforeEach()를 호출하고 나면 모든 라우팅이 대기상태가 된다.
//URL로 라우팅 하기 위해서는 newxt()를 호출해야한다

// router.beforeEach((to, from, next) => {
//  console.log(userStore);
// const isUserAuth = store.getters["users/getUserAuthGrade"];
// console.log(to.matched[0].meta);
// next();
// if (isUserAuth >= to.matched[0].meta.menuAuth) {
//   alert("성공");
//   console.log("성공");
//   next();
// }
// if(to.name === 'Login'){
//   next()
// } else if (isLogin === ''){
//   alert('세션이 초기화 되었습니다./n 다시 로그인 해 주세요.')
//   router.push({name:"Login"});
// }
// });


//전역으로 페이지 상단의 제목을 변경하기 위해서 아래와 같이 적용함.
const makeTitle = (title) => {
  let selectedGame = window.localStorage.getItem("selectedGame");

  return title ? "${title} | "+ selectedGame +" 관리리시스템" : selectedGame+" 관리시스템";
  // return title ? "${title} | 2WinChance관리리시스템" : "2WinChance관리시스템";
}

router.afterEach((to, from) => {
  Vue.nextTick(() => {
    document.title = makeTitle(to.meta.title);
    document.title = makeTitle(from.meta.title);
  });
});

export default router;
