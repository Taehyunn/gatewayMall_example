import axios from "@/plugins/axios";

export default {

    state: {
        regList: '',
        regTotalPages:0,
        regTotalItems:0,
        regTotalCurrentPage:0,

    },
    getters: {
        getRegCurrentPage(state) {
            return state.regTotalCurrentPage;
        },
        getDetailRegList(state) {
            return state.regList;
        },
        getRegTotalItems(state) {
            return state.regTotalItems;
        },
        getRegTotalPage(state) {
            return state.regTotalPages;
        },
    },
    mutations: {
        SETRegList(state, regList) {
            state.regList = regList;
            // console.log(state.detailBoardList);
        },
        SetRegTotalPage(state, regTotalPages) {
            state.regTotalPages = regTotalPages;
        },
        SetRegTotalItems(state, regTotalItems) {
            state.regTotalItems = regTotalItems;
        },
        SetRegCurrentPage(state, regTotalCurrentPage) {
            state.regTotalCurrentPage = regTotalCurrentPage;
        },
    },

    actions: {
        FETCHREGLIST: ({commit}, payload) => {
            // console.log("board List : " + payload);
            // commonFn.setToken();

            return new Promise((resolve, reject) => {
                axios
                    .post(`/api/v1/Get_AdminMember`, payload)
                    .then(({data}) => {
                        if (data.res_code == "200") {
                            resolve(data);

                            commit("SETRegList", data);
                            commit("SetRegTotalPage", data.totalPages);
                            commit("SetRegTotalItems", data.totalItems);
                            commit("SetRegCurrentPage", payload.get("page"));
                        } else {
                            resolve(data);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        ADDREGLSIT: ({commit}, payload) => {
            // console.log("board List : " + payload);
            // commonFn.setToken();

            return new Promise((resolve, reject) => {
                axios
                    .post(`/api/v1/ISet_AdminMember`, payload)
                    .then(({data}) => {
                        if (data.res_code == "200") {
                            resolve(data);
                            // console.log(data);
                            commit("SETRegList", "");
                        } else {
                            resolve(data);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        UPDATEADMINMEMBER: ({commit}, payload) => {
            // console.log("board List : " + payload);
            // commonFn.setToken();

            return new Promise((resolve, reject) => {
                axios
                    .post(`/api/v1/USet_AdminMember`, payload)
                    .then(({data}) => {
                        if (data.res_code == "200") {
                            resolve(data);
                            // console.log(data);
                            commit("SETRegList", "");
                        } else {
                            resolve(data);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
    }
}