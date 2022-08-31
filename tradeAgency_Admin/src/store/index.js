import Vue from "vue";
import Vuex from "vuex";

//추가한 module import
import User from "./module/users";
import Code from "./module/codelist";
import Orderlist from "./module/orderlist";
import Boardlist from "./module/boardlist";
import MenuInfo from "./module/menuinfo";
import Commonmanage from "./module/commonmanage";
import Menumanage from "./module/menumanage";
import CommonCodeDetail from "./module/codeDetailList";
import ReportDaily from "./module/reportdaily";
import ReportWeekly from "./module/reportWeekly";
import ReportMonthly from "./module/reportMonthly";
import adminMember from "./module/adminMember";
import memberList from "./module/memberList";
import ticket from "./module/ticket";
import Contest from "./module/Contest";
import LandingMain from "./module/LandingMain";
import Item from "./module/twowinplus/item"
import GameItrd from "./module/twowinplus/gameitrd";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        selectedGame: window.localStorage.getItem("selectedGame"),
        alertDialogToggle: false,
        alertDialogInfo: null,
        alertProgressCircular:false,
    },
    mutations: {
        openAlertDialog(state, payload) {
            state.alertDialogInfo = payload
            state.alertDialogToggle = true
        },
        closeAlertDialog(state) {
            state.alertDialogInfo = null
            state.alertDialogToggle = false
        },
        onProgress(state) {
          state.alertProgressCircular = true;
          // console.log(state.alertProgressCircular);
        },
        offProgress(state) {
          state.alertProgressCircular = false;
          // console.log(state.alertProgressCircular);
        },
    },
    actions: {
        // Alert Dialog
        openAlertDialog({ commit }, alertDialogInfo) {
            commit("openAlertDialog", alertDialogInfo)
        },
        closeAlertDialog({ commit }) {
            commit("closeAlertDialog")
        },
    },
    modules: {
        adminMember:adminMember,
        users: User,
        code: Code,
        orderList: Orderlist,
        boardList: Boardlist,
        menuinfo: MenuInfo,
        commonmanage: Commonmanage,
        menuMage: Menumanage,
         commoncodedetail: CommonCodeDetail,
        reportdaily: ReportDaily,
        reportWeekly: ReportWeekly,
        reportMonthly: ReportMonthly,
        memberList: memberList,
        ticket:ticket,
        Contest:Contest,
        LandingMain:LandingMain,
        Item:Item,
        GameItrd:GameItrd
    },
});
