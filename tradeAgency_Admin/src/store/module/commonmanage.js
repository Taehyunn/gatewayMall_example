import axios from "@/plugins/axios";
// import JwtAt_service from "@/common/jwt.at_service";

//token 보내는 것.
// let token = JwtAt_service.getATToken();
// let header = 'Bearer ' + token;
// let headerConfig = {
//   headers: {
//     Authorization: "Bearer " + token,
//   },
// };

export default {
  state: {
    detailCommonList: [],
    commonTotalPages: 0, //전체 페이지수
    commonTotalItems: 0, //전체 갯수
    commonCurrentPage: 0, //현재 페이지 수
    size: 10, //몇개씩 불러올 건지를 정하는 변수
    cmmncdId: "0005",
    error: null,
    chart_Item:"",
    dailyList:[],
  },
  getters: {
    getCommonCurrentPage(state) {
      return state.currentPage;
    },
    getCommonCommonId(state) {
      return state.cmmncdId;
    },
    getDetailCommonList(state) {
      return state.detailCommonList;
    },
    getCommonTotalItems(state) {
      return state.commonTotalItems;
    },
    getCommonTotalPage(state) {
      return state.commonTotalPages;
    },
    getChartItem(state ){
      return state.chart_Item;
    },
    getDailyItem(state ){
      return state.dailyList;
    },

  },
  mutations: {
    //값이 호출되면 다시 정의하도록 하자.
    SETCOMMONLIST(state, detailCommonList) {
      state.detailCommonList = detailCommonList;
      // console.log(state.detailBoardList);
    },
    SetCommonTotalPage(state, commonTotalPages) {
      state.commonTotalPages = commonTotalPages;
    },
    SetCommonTotalItems(state, commonTotalItems) {
      state.commonTotalItems = commonTotalItems;
    },
    SetCommonCurrentPage(state, commonCurrentPage) {
      state.commonCurrentPage = commonCurrentPage;
    },
    GETCHARTSETS(state, chartItem) {
      state.chart_Item = chartItem;
    },
    GETDAILYLISTSET(state, dailyList) {
      state.dailyList = dailyList
    }
  },
  actions: {
    FETCHCOMMONCODE: ({ commit }, payload) => {
      // console.log("common List : " + payload);
      return new Promise((resolve, reject) => {
        axios
          .post(`/api/v1/Get_CmmncdList`, payload)
          .then(({ data }) => {
            if (data.res_code == "200") {
              resolve(data);
              // console.log(data);
              // console.log('totalItems: '+data.totalItems);
              // console.log('totalPages: '+data.totalPages);
              // console.log('CurrentPage: '+data.CurrentPage);
              //mutation 호출
              commit("SETCOMMONLIST", data);
              commit("SetCommonTotalPage", data.totalPages);
              commit("SetCommonTotalItems", data.totalItems);
              commit("SetCommonCurrentPage", data.CurrnetPage);
            } else {
              resolve(data);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    SAVECOMMONCODE: ({ commit }, payload) => {
      // console.log('신규 저장 : '+ payload.get("subject"));
      // console.log(JwtAt_service.getATToken());
      // let token = JwtAt_service.getATToken();
      // // let header = 'Bearer ' + token;
      // let headerConfig = {
      //   headers: {
      //     Authorization: "Bearer " + token,
      //   },
      // };
      // let form = new FormData();
      return new Promise((resolve, reject) => {
        axios
          .post("/api/v1/ISet_Cmmncd", payload)
          .then(({ data }) => {
            if (data.res_code === "200") {
              resolve(data);
              console.log(data);

              //    form.set("page", 1);
              //    form.set("size", 10);

              //저장후 다시 리스트를 여기서 호출해도 되는것인가?
              commit("SETCOMMONLIST", "");
            } else {
              resolve(data);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    COMMONDELETEOREDITOR: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        axios
          .post("/api/v1/USet_Cmmncd", payload)
          .then(({ data }) => {
            if (data.res_code === "200") {
              resolve(data);
              commit("SETCOMMONLIST", "");
            } else {
              resolve(data);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    GETCHARTDATA: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        axios
            .post("/api/v1/Get_TbStatTime", payload)
            .then(({ data }) => {
              if (data.res_code === "200") {
                resolve(data);
                commit("GETCHARTSETS", "");
              } else {
                resolve(data);
              }
            })
            .catch((error) => {
              reject(error);
            });
      });
    },
    // GETDAILYLIST: ({ commit }, payload) => {
    //   return new Promise((resolve, reject) => {
    //     axios
    //         .post("/api/v1/DailySelect", payload)
    //         .then(({ data }) => {
    //           if (data.res_code === "200") {
    //             resolve(data);
    //             commit("GETDAILYLISTSET", "");
    //           } else {
    //             resolve(data);
    //           }
    //         })
    //         .catch((error) => {
    //           reject(error);
    //         });
    //   });
    // },

  },
};
