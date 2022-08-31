import axios from "axios";
import JwtAt_service from "@/common/jwt.at_service";
import JwtAt_rt_service from "@/common/jwt.rt_service";

import Auth from "@/common/auth.service";
import menuinfo from "./menuinfo";

export default {
  // namespaced: true,

  state: {
    user: {},
    strUser: "",
    strUserId: "",
    userGrade: "",
    error: null,
    isAuthenticated: false,
    strnowUser: 0,
    strnewUser: "",
    strticketNum: "",
  },
  getters: {
    //사용자의 정보를 가지고 오는 함수
    currentCheckUser(state) {
      state.strUser = window.localStorage.getItem("userName");
      // console.log('state user' + state.strUser);
      return state.strUser;
    },
    getUserId(state) {
      //state에 강제로 주입처리
      state.strUserId = window.localStorage.getItem("userId");
      // console.log('사용자 아이디 : ' + state.strUserId);
      return state.strUserId;
    },
    //인증여부
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
    //사용자 token을 가져오는 함수
    /*getUserToken(state) {
      return JwtAt_service.getUserToken(state.user.at);
    },*/
    getCurrentUserCompanyId(state) {
      return Auth.getInfoToken(state);
    },
    getNowUser(state) {
      return state.strnowUser;
    },
    //사용자의 권한 가져오는 함수
    getUserAuthGrade(state) {
      return state.userGrade;
    },
  },
  mutations: {
    //사용자권한 fix
    SETAUTH(state, user) {
      // console.log(user);
      state.user = user;
      state.isAuthenticated = true;
      state.strUser = state.user.userName;
      state.strUserId = state.user.userId;
      state.userGrade = state.user.userAuthGrade; //사용자 권한 코드도 같이 들고 있자.
      //AT -> 로컬스토리지 등록
      JwtAt_service.saveATToken(state.user.at);
      //RT -> 로컬스토리지 등록
      JwtAt_rt_service.saveRTToken(state.user.rt);
      window.localStorage.setItem("userName", state.user.userName);
      window.localStorage.setItem("userId", state.user.userId);
      window.localStorage.setItem("UG", state.user.userAuthGrade);
      window.localStorage.setItem("ATexpDt", state.user.ATexpDt);
      window.localStorage.setItem("RTexpDt", state.user.RTexpDt);



      // window.localStorage.setItem("UG", state.user.userAuthGrade);
      // window.localStorage.setItem("companyNm", state.user.companyNm);
      // window.localStorage.setItem("userTel", state.user.userTel);
      // Auth.saveInfoToken(state.user.companyId);
    },

    PURGEAUTH(state) {

      state.isAuthenticated = false;
      state.user = {};
      state.error = {};
      state.strUser = "";
      JwtAt_service.destroyATToken(state.user.at);
      JwtAt_rt_service.destroyRTToken(state.user.rt);
      Auth.destroyInfoToken(state.user.userName);
      window.localStorage.removeItem("userId");
      window.localStorage.removeItem("userName");
      window.localStorage.removeItem("UG");
      window.localStorage.removeItem("MenuList");
      window.localStorage.removeItem("ATexpDt");
      window.localStorage.removeItem("RTexpDt");
      window.localStorage.removeItem("AT");
      // window.localStorage.removeItem("expDt");
      console.log('call menu init start');
      menuinfo.state.menuList = [];
      console.log('call menu init end');
        // window.localStorage.removeItem("companyNm");
      // window.localStorage.removeItem("userTel");
    },
    SETNOWUSER(state) {
      return (state.strnowUser = state.strnowUser + 1);
    },
    // LEAVENOWPAGE(state) {
    //   // window.addEventListener("beforeunload");
    // }
  },
  actions: {
    LOGIN: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        // 2WinPlus와의 혼용을 위해, 로그인 요청은 2WinChance Back단에 요청한다.
        // axios
        axios.create()
          .post(process.env.VUE_APP_API_BASE_URL_TWOWINCHANCE + `/api/v1/LoginReq`, payload)
          .then(({ data }) => {
            if (data.res_code == "200") {
              console.log(data);
              resolve(data);
              //mutation 호출
              commit("SETAUTH", data);
            } else {
              alert("아이디와 비밀번호를 확인해주세요.");
            }
          })
          .catch((error) => {
            reject(error);
            alert("아이디와 비밀번호를 확인해주세요.");
          });
      });
    },
    LOGOUT: ({ commit }) => {
      // console.log("logout");
      console.log('call purgeauth');
      commit("PURGEAUTH");
    },
    UPDATENOWUSER: ({ commit }) => {
      // commit("SETNOWUSER")

      commit("SETNOWUSER");
    },
    // LEAVEPAGE: ({ commit }) => {

    //   commit("LEAVENOWPAGE");
    // },
  },
};
