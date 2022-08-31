import axios from "@/plugins/axios";

export default {
    state: {
        summaryList: [],
        InfoList: [],
        UserResultList: [],
        userLineupsList:[],

    },
    getters: {

        getContestSummaryList(state) {
            return state.summaryList;
        },
        getInfoList(state) {
            return state.InfoList;
        },
        getUserLineupsList(state) {
            return state.userLineupsList;
        },


    },
    mutations: {

        setSummaryList(state, summaryList) {
            return state.summaryList = summaryList;
        },
        setInfoList(state, InfoList) {
            return state.InfoList = InfoList;
        },
        setUserResultList(state, UserResultList) {
            return state.UserResultList = UserResultList;
        },
        setUserLineupsList(state, userLineupsList) {
            return state.userLineupsList = userLineupsList;
        },




    },
    actions: {

        GETSUMMARYLIST: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                axios
                    .post("/api/v1/Get_ContestSummaryList", payload)
                    .then(({data}) => {
                        if (data.res_code === "200") {
                            resolve(data);
                            // console.log(data);
                            commit("setSummaryList", data);
                        } else {
                            resolve(data);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        GETINFOLIST: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                axios
                    .post("/api/v1/Get_ContestInfoList", payload)
                    .then(({data}) => {
                        if (data.res_code === "200") {
                            resolve(data);
                            // console.log(data);
                            commit("setInfoList", data);
                        } else {
                            resolve(data);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        GETUSERRESULT: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                axios
                    .post("/api/v1/Get_ContestUserResult", payload)
                    .then(({data}) => {
                        if (data.res_code === "200") {
                            resolve(data);
                            // console.log(data);
                            commit("setUserResultList", data);
                        } else {
                            resolve(data);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        GETUSERLINEUPS: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                axios
                    .post("/api/v1/Get_ContestUserLineups", payload)
                    .then(({data}) => {
                        if (data.res_code === "200") {
                            resolve(data);
                            // console.log(data);
                            commit("setUserLineupsList", data);
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
