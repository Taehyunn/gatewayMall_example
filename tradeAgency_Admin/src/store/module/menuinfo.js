import axios from "@/plugins/axios";
// import JwtAt_service from "@/common/jwt.at_service";
//
// //token 보내는 것. 향후에 공통으로 빼자
// let token = JwtAt_service.getATToken();
// let headerConfig = {
//   headers: {
//     Authorization: "Bearer " + token,
//   },
// };
export default {
  state: {
    //로그인 후 보여줄 메뉴목록
    menuList: [],
    moveMenuResult: "",
    menuCheck: "",
  },
  getters: {
    //메뉴 목록 리스트들
    UpdateMenu(state) {
      return state.menuList = JSON.parse(
          window.localStorage.getItem("MenuList")
      );
      // console.log("menuList : " + state.menuList[0]);
    },
    MvMenuResult(state) {
      return state.moveMenuResult;
    },
    MenuCheckOk(state) {
      return state.menuCheck;
    },
  },
  mutations: {
    //메뉴목록을 받아와 배열에 추가
    UPDATEMENULISTS(state, menu) {
      // console.log(menu);
      // console.log("mutation info : " + menu.menuList[0]);
      state.menuList = menu.menuList;
    },
    MOVEMENUVIEW(state, Result) {
      state.moveMenuResult = Result;
    },
    MENUCHECKOK(state, menuItem) {
      state.menuCheck = menuItem;
    },
    //로그아웃 시 메뉴리스트 제거
    SETINITMENU(state) {

      state.menuList = [];
    },
  },
  actions: {
    //로그인 후 권한에 맞는 메뉴목록 가져온다.
    UPDATEMENUS: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        axios
            .post(`/api/v1/MenuReq`, payload)
            .then(({ data }) => {
              if (data.res_code == "200") {
                resolve(data);
                // console.info("menu 받아온다: " + data);
                //mutation 호출
                commit("UPDATEMENULISTS", data);
              } else {
                resolve(data);
              }
            })
            .catch((error) => {
              reject(error);
            });
      });
    },
    //메뉴목록 클릭 시 권한확인 및 이동.
    MOVEMENU: ({ commit }, payload) => {

      return new Promise((resolve, reject) => {
        axios
            .post(`/api/v1/ChkMenuReq`, payload )
            .then(({ data }) => {
              if (data.res_code == "200") {
                // console.log(data);
                // console.log("메뉴 목록: " + payload.menuName)
                resolve(data);
                // console.info("menu 받아온다: " + data);
                //mutation 호출
                commit("MOVEMENUVIEW", data.Result);
              } else {
                resolve(data);
              }
            })
            .catch((error) => {
              reject(error);
            });
      });
    },
    MENUCHECK: ({ commit }, payload) => {
      commit("MENUCHECKOK", payload);
    },
  },
};
