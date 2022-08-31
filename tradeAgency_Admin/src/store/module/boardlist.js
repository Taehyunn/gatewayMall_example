// import axios from "@/plugins/axios";
import basicAxios from 'axios';

export default {
  state: {
    detailBoardList: [],
    boardTotalPages: 0, //전체 페이지수
    boardTotalItems: 0, //전체 갯수
    boardCurrentPage: 0, //현재 페이지 수
    size: 10, //몇개씩 불러올 건지를 정하는 변수
    cmmncdId: "0005",
    error: null,
  },
  getters: {
    getBoardCurrentPage(state) {
      return state.currentPage;
    },
    getBoardCommonId(state) {
      return state.cmmncdId;
    },
    getDetailBoardList(state) {
      return state.detailBoardList;
    },
    getBoardTotalItems(state) {
      return state.boardTotalItems;
    },
    getBoardTotalPage(state) {
      return state.boardTotalPages;
    },
  },
  mutations: {
    //값이 호출되면 다시 정의하도록 하자.
    SETBOARDLIST(state, detailList) {
      state.detailBoardList = detailList;
      // console.log(state.detailBoardList);
    },
    SetBoardTotalPage(state, boardTotalPage) {
      state.boardTotalPages = boardTotalPage;
    },
    SetBoardTotalItems(state, boardTotalItem) {
      state.boardTotalItems = boardTotalItem;
    },
    SetBoardCurrentPage(state, boardCurrentPage) {
      state.boardCurrentPage = boardCurrentPage;
    },
  },
  actions: {
    FETCHBOARDLIST: ({ commit }, payload) => {
      basicAxios.defaults.baseURL = 'http://dev.2winchance.com'; //서버주소
      // basicAxios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
      // basicAxios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
      // 캐싱 방지
      // basicAxios.defaults.headers.get['Cache-Control'] = 'no-cache';
      // basicAxios.defaults.headers.get['Pragma'] = 'no-cache';

      return new Promise((resolve, reject) => {
        basicAxios
          .get("/api/getNoticeList.php", {
            params: payload
          })
          .then(({ data }) => {
            if (data.code == "200") {
              resolve(data);
              // console.log(data);
              // console.log('totalItems: '+data.totalItems);
              // console.log('totalPages: '+data.totalPages);
              // console.log('CurrentPage: '+data.CurrentPage);
              //mutation 호출
              commit("SETBOARDLIST", data);
              commit("SetBoardTotalPage", data.totalPages);
              commit("SetBoardTotalItems", data.totalItems);
              commit("SetBoardCurrentPage", payload.get("page"));
            } else {
              resolve(data);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    INSERTBOARD: ({ commit }, payload) => {
      // console.log('신규 저장 : '+ payload.get("subject"));
      // console.log(JwtAt_service.getATToken());
      basicAxios.defaults.baseURL = 'http://dev.2winchance.com'; //서버주소
      return new Promise((resolve, reject) => {

        basicAxios
          .post("/api/setNotice.php", payload )
          .then(({ data }) => {
            if (data.res_code === "200") {
              resolve(data);
              console.log(data);

              //    form.set("page", 1);
              //    form.set("size", 10);

              //저장후 다시 리스트를 여기서 호출해도 되는것인가?
              commit("SETBOARDLIST", "");
            } else {
              resolve(data);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    UPDATEBOARD: ({ commit }, payload) => {
      // console.log('수정 토큰 : '+ JwtAt_service.getATToken());
      basicAxios.defaults.baseURL = 'http://dev.2winchance.com'; //서버주소
      // axios.defaults.headers.common["Authorization"] = `Bearer ${JwtAt_service.getRTToken()}`;
      return new Promise((resolve, reject) => {
        basicAxios
          .post("/api/setNotice.php", payload)
          .then(({ data }) => {
            if (data.res_code === "200") {
              resolve(data);
              commit("SETBOARDLIST", "");
            } else {
              resolve(data);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    HideOrDelete: ({ commit }, payload) => {
      // console.log(payload.get("num"));
      basicAxios.defaults.baseURL = 'http://dev.2winchance.com'; //서버주소
      return new Promise((resolve, reject) => {
        basicAxios
          .post("/api/setNotice.php", payload)
          .then(({ data }) => {
            if (data.code == "200") {
              resolve(data);
              // console.log(data);
              commit("SETBOARDLIST", "");
            } else if(data.code == "501") {
              console.log("삭제에 실패했습니다.");
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
