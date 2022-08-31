import axios from "@/plugins/axios";
// import JwtAt_service from "@/common/jwt.at_service";


export default {
    state: {
        detailCodeList: [],
        codeTotalPages: 0, //전체 페이지수
        codeTotalItems: 0, //전체 갯수
        codeCurrentPage: 0, //현재 페이지 수
        size: 10,  //몇개씩 불러올 건지를 정하는 변수
        cmmncdId: '0005',
        error: null,
    },
    getters: {
        getCodeDetailCurrentPage(state) {
            return state.currentPage;
        },
        getTopCommonId(state) {
            return state.cmmncdId;
        },
        getCodeDetailList(state) {
            return state.detailCodeList;
        },
        getCodeDetailTotalItems(state) {
            return state.codeTotalItems;
        },
        getCodeDetailTotalPage(state) {
            return state.codeTotalPages;
        }

    },
    mutations: {
        //값이 호출되면 다시 정의하도록 하자.
        SETCODELIST(state, detailList) {
            state.detailCodeList = detailList;
        },
        SetCodeTotalPage(state, codeTotalPage) {
            state.codeTotalPages = codeTotalPage;
        },
        SetCodeTotalItems(state, codeTotalItem) {
            state.codeTotalItems = codeTotalItem;
        },
        SetCodeCurrentPage(state, codeCurrentPage) {
            state.codeCurrentPage = codeCurrentPage;
        }
    },
    actions: {
        GETCODEDETAILLIST: ({commit}, payload) => {
            // console.log("code List : " + payload.get("page"));
            return new Promise((resolve, reject) => {
                axios
                    .post(`/api/v1/Get_CmmncdDetailCodeList`, payload )
                    .then(({data}) => {
                        if (data.res_code == "200") {
                            resolve(data);
                            // console.log('totalItems: '+data.totalItems);
                            // console.log('totalPages: '+data.totalPages);
                            // console.log('CurrentPage: '+data.CurrentPage);
                            //mutation 호출
                            commit("SETCODELIST", data);
                            commit("SetCodeTotalPage", data.totalPages);
                            commit("SetCodeTotalItems", data.totalItems);
                            commit("SetCodeCurrentPage", payload.get("page"));

                        } else {
                            resolve(data);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        GETCODEID: ({commit}, payload) => {
            // console.log("code List : " + payload.get("page"));
            return new Promise((resolve, reject) => {
                axios
                    .post(`/api/v1/Get_CmmncdId`, payload )
                    .then(({data}) => {
                        if (data.res_code == "200") {
                            resolve(data);
                            // console.log('totalItems: '+data.totalItems);
                            // console.log('totalPages: '+data.totalPages);
                            // console.log('CurrentPage: '+data.CurrentPage);
                            //mutation 호출
                            commit("SETCODELIST", data);
                            commit("SetCodeTotalPage", data.totalPages);
                            commit("SetCodeTotalItems", data.totalItems);
                            commit("SetCodeCurrentPage", payload.get("page"));

                        } else {
                            resolve(data);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        GETCODEIDLIST: ({commit}, payload) => {
            // console.log("code List : " + payload.get("cmmncdId"));
            return new Promise((resolve, reject) => {
                axios
                    .post(`/api/v1/Get_CmmncdIdList`, payload)
                    .then(({data}) => {
                        if (data.res_code == "200") {
                            resolve(data);
                            // console.log('totalItems: '+data.totalItems);
                            // console.log('totalPages: '+data.totalPages);
                            // console.log('CurrentPage: '+data.CurrentPage);
                            //mutation 호출
                            commit("SETCODELIST", data);
                            commit("SetCodeTotalPage", data.totalPages);
                            commit("SetCodeTotalItems", data.totalItems);
                            commit("SetCodeCurrentPage", payload.get("page"));

                        } else {
                            resolve(data);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        ISETCODEDETAIL: ({commit}, payload) => {
            // console.log('신규 저장 : '+ payload);
            // console.log(JwtAt_service.getATToken());

            return new Promise((resolve, reject) => {
                axios
                    .post('/api/v1/ISet_CmmncdDetail', payload )
                    .then(({data}) => {
                        if (data.res_code === "200") {
                            resolve(data);
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
        USETCODEDETAIL: ({commit}, payload) => {
            // console.log('수정 토큰 : '+ JwtAt_service.getATToken());
            // axios.defaults.headers.common["Authorization"] = `Bearer ${JwtAt_service.getRTToken()}`;
            // console.log(headerConfig);

            return new Promise((resolve, reject) => {
                axios
                    .post('/api/v1/USet_CmmncdDetail', payload )
                    .then(({data}) => {
                        if (data.res_code === "200") {
                            resolve(data);
                            commit("SETCODELIST", '');
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