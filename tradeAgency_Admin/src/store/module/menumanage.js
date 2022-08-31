import axios from "@/plugins/axios";
// import JwtAt_service from "@/common/jwt.at_service";
//
// //token 보내는 것. 향후에 공통으로 빼자
// let token = JwtAt_service.getATToken();

export default {
  state: {
    detailMenuList: [],
    menutotalPages: 0, //전체 페이지수
    menuTotalItems: 0, //전체 갯수
    menuCurrentPage: 0, //현재 페이지 수
  },
  getters: {
    getDetailMenuList(state) {
      return state.detailMenuList;
    },
    getMenuCurrentPage(state) {
      return state.menuCurrentPage;
    },
    getMenuTotalItems(state) {
      return state.menuTotalItems;
    },
    getMenuTotalPage(state) {
      return state.menutotalPages;
    },
  },
  mutations: {
    SETMENULIST(state, menuList) {
      state.detailMenuList = menuList;
    },
    SetMenuTotalPage(state, menuTotalPage) {
      state.menuTotalPages = menuTotalPage;
    },
    SetMenuTotalItems(state, menuTotalItem) {
      state.menuTotalItems = menuTotalItem;
    },
    SetMenuCurrentPage(state, menuCurrentPage) {
      state.menuCurrentPage = menuCurrentPage;
    },
  },
  actions: {
    GETAUTHCODELIST: ({ commit }, payload) => {

      return new Promise((resolve, reject) => {
        axios
            .post("/api/v1/Get_AuthList", payload)
            .then(({ data }) => {
              if (data.res_code === "200") {
                resolve(data);
                console.log(data);
                commit("SETMENULIST");
              } else {
                resolve(data);
              }
            })
            .catch((error) => {
              reject(error);
            });
      });
    },
    MENUADDSTART: ({ commit }, payload) => {

      return new Promise((resolve, reject) => {
        axios
          .post("/api/v1/Get_TbMenu", payload)
          .then(({ data }) => {
            if (data.res_code === "200") {
              resolve(data);
              console.log(data);
              commit("SETMENULIST", data);
              commit("SetMenuTotalPage", data.totalPages);
              commit("SetMenuTotalItems", data.totalItems);
              commit("SetMenuCurrentPage", data.CurrentPage);
            } else {
              resolve(data);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    SAVEMENUCODE: ({ commit }, payload) => {


      let targetUrl = "/api/v1/ISet_TbMenu";
      if (payload.get("mType") === "I") targetUrl = "/api/v1/ISet_TbMenu";
      if (payload.get("mType") === "U") targetUrl = "/api/v1/USet_TbMenu";

      return new Promise((resolve, reject) => {
        axios
          .post(targetUrl, payload)
          .then(({ data }) => {
            if (data.res_code === "200") {
              resolve(data);
              console.log(data);

              commit("SETMENULIST", "");
            } else {
              resolve(data);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};
