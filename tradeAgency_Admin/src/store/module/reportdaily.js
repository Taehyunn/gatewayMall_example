import axios from "@/plugins/axios";

export default {
    state: {
        testDailyList: [],
        dailyJoinUserList: [],
        dailyContest: [],
        dailyGameContest: [],
        dailyJoinGameList: [],
        dailyFPProductList: [],
        dailyFPCashList: [],
    },
    getters: {
        getDailyList(state) {
            return state.testDailyList;
        },
        getDailyJoinUserList(state) {
            return state.dailyJoinUserList;
        },
        getDailyContestList(state) {
            return state.dailyContest;
        },
        getDailyGameContestList(state) {
            return state.dailyGameContest;
        },
        getDailyJoinGameList(state) {
            return state.dailyJoinGameList;
        },
        getDailyFPProductList(state) {
            return state.dailyFPProductList;
        },
        getDailyFPCashList(state) {
            return state.dailyFPCashList;
        },
    },
    mutations: {
        setDailyList(state, dailyList) {
            return state.testDailyList = dailyList;
        },
        setDailyJoinUserList(state, dailyJoinUserList) {
            return state.dailyJoinUserList = dailyJoinUserList;
        },
        setDailyContest(state, dailyContest) {
            return state.dailyContest = dailyContest;
        },
        setDailyGameContest(state, dailyGameContest) {
            return state.dailyGameContest = dailyGameContest;
        },
        setDailyJoinGameList(state, dailyJoinGameList) {
            return state.dailyJoinGameList = dailyJoinGameList;
        },
        setDailyFPProductList(state, dailyFPProductList) {
            return state.dailyFPProductList = dailyFPProductList;
        },
        setDailyFPCashList(state, dailyFPCashList) {
            return state.dailyFPCashList = dailyFPCashList;
        }


    },
    actions: {
        getTestDailyList: ({commit}, payload) => {

            return new Promise((resolve, reject) => {
                axios
                    .post("/api/v1/TestReportDaily", payload)
                    .then(({data}) => {
                        if (data.res_code === "200") {
                            resolve(data);
                            console.log(data);
                            commit("setDailyList", data);
                        } else {
                            resolve(data);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        GETJOINUSERLIST: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                axios
                    .post("/api/v1/Get_DailyJoinUser", payload)
                    .then(({data}) => {
                        if (data.res_code === "200") {
                            resolve(data);
                            // console.log(data);
                            commit("setDailyJoinUserList", data);
                        } else {
                            resolve(data);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        GETDAILYCONTEST: ({commit}, payload) => {

            return new Promise((resolve, reject) => {
                axios
                    .post("/api/v1/Get_DailyContest", payload)
                    .then(({data}) => {
                        if (data.res_code === "200") {
                            resolve(data);
                            // console.log(data);
                            commit("setDailyContest", data);
                        } else {
                            resolve(data);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        GETDAILYGAMECONTEST: ({commit}, payload) => {

            return new Promise((resolve, reject) => {
                axios
                    .post("/api/v1/Get_DailyGameContest", payload)
                    .then(({data}) => {
                        if (data.res_code === "200") {
                            resolve(data);
                            // console.log(data);
                            commit("setDailyGameContest", data);
                        } else {
                            resolve(data);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        GETDAILYJOINGAME: ({commit}, payload) => {

            return new Promise((resolve, reject) => {
                axios
                    .post("/api/v1/Get_DailyJoinGame", payload)
                    .then(({data}) => {
                        if (data.res_code === "200") {
                            resolve(data);
                            // console.log(data);
                            commit("setDailyJoinGameList", data);
                        } else {
                            resolve(data);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        GETDAILYFPPRODUCT: ({commit}, payload) => {

            return new Promise((resolve, reject) => {
                axios
                    .post("/api/v1/Get_DailyFPProduct", payload)
                    .then(({data}) => {
                        if (data.res_code === "200") {
                            resolve(data);
                            // console.log(data);
                            commit("setDailyFPProductList", data);
                        } else {
                            resolve(data);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        GETDAILYFPCASH: ({commit}, payload) => {

            return new Promise((resolve, reject) => {
                axios
                    .post("/api/v1/Get_DailyFPCash", payload)
                    .then(({data}) => {
                        if (data.res_code === "200") {
                            resolve(data);
                            // console.log(data);
                            commit("setDailyFPCashList", data);
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
