import axios from "@/plugins/axios";

export default {
    state: {

        weeklyJoinUserList: [],
        weeklyContest: [],
        weeklyGameContest: [],
        weeklyJoinGame: [],
        weeklyFPProduct: [],
        weeklyOpenJoinUser: [],
        weeklyOpenGameContest: [],

    },
    getters: {

        getWeeklyJoinUserList(state) {
            return state.weeklyJoinUserList;
        },
        getWeeklyContestList(state) {
            return state.dailyContest;
        },
        getWeeklyGameContestList(state) {
            return state.dailyGameContest;
        },
        getweeklyJoinGame(state) {
            return state.weeklyJoinGame;
        },
        getweeklyFPProduct(state) {
            return state.weeklyFPProduct;
        },
        getweeklyOpenJoinUser(state) {
            return state.weeklyOpenJoinUser;
        },
        getweeklyOpenGameContest(state) {
            return state.weeklyOpenGameContest;
        },
    },
    mutations: {

        setWeeklyJoinUserList(state, weeklyJoinUserList) {
            return state.weeklyJoinUserList = weeklyJoinUserList;
        },
        setWeeklyContest(state, weeklyContest) {
            return state.weeklyContest = weeklyContest;
        },
        setWeeklyGameContest(state, weeklyGameContest) {
            return state.weeklyGameContest = weeklyGameContest;
        },
        setWeeklyJoinGame(state, weeklyJoinGame) {
            return state.weeklyJoinGame = weeklyJoinGame;
        } ,
        setweeklyFPProductt(state, weeklyFPProduct) {
            return state.weeklyFPProduct = weeklyFPProduct;
        },
        setWeeklyJoinUser(state, weeklyOpenJoinUser) {
            return state.weeklyOpenJoinUser = weeklyOpenJoinUser;
        },
        setWeeklyOpenGameContest(state, weeklyOpenGameContest) {
            return state.weeklyOpenGameContest = weeklyOpenGameContest;
        }


    },
    actions: {

        GETWEEKLYJOINUSERLIST: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                axios
                    .post("/api/v1/Get_WeeklyJoinUser", payload)
                    .then(({data}) => {
                        if (data.res_code === "200") {
                            resolve(data);
                            // console.log(data);
                            commit("setWeeklyJoinUserList", data);
                        } else {
                            resolve(data);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        GETWEEKLYGAMECONTEST: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                axios
                    .post("/api/v1/Get_WeeklyGameContest", payload)
                    .then(({data}) => {
                        if (data.res_code === "200") {
                            resolve(data);
                            // console.log(data);
                            commit("setWeeklyGameContest", data);
                        } else {
                            resolve(data);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        GETWEEKlYJOINGAME: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                axios
                    .post("/api/v1/Get_WeeklyJoinGame", payload)
                    .then(({data}) => {
                        if (data.res_code === "200") {
                            resolve(data);
                            // console.log(data);
                            commit("setWeeklyJoinGame", data);
                        } else {
                            resolve(data);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        GETweeklyFPProductT: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                axios
                    .post("/api/v1/Get_weeklyFPProductt", payload)
                    .then(({data}) => {
                        if (data.res_code === "200") {
                            resolve(data);
                            // console.log(data);
                            commit("setweeklyFPProductt", data);
                        } else {
                            resolve(data);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        GETWEEKLYARP: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                axios
                    .post("/api/v1/Get_WeeklyARP", payload)
                    .then(({data}) => {
                        if (data.res_code === "200") {
                            resolve(data);
                            // console.log(data);
                            commit("setWeeklyGameContest", data);
                        } else {
                            resolve(data);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        GETWEEKLTGOLDOPEN: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                axios
                    .post("/api/v1/Get_WeeklyGoldOpen", payload)
                    .then(({data}) => {
                        if (data.res_code === "200") {
                            resolve(data);
                            // console.log(data);
                            commit("setWeeklyGameContest", data);
                        } else {
                            resolve(data);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        GETWEEKLYOPENJOINUSER: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                axios
                    .post("/api/v1/Get_WeeklyOpenJoinUser", payload)
                    .then(({data}) => {
                        if (data.RES_CODE == "200") {
                            resolve(data);
                            // console.log(data);
                            commit("setWeeklyJoinUser", data);
                        } else {
                            resolve(data);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        GETWEEKLYOPENGAMECONTEST: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                axios
                    .post("/api/v1/Get_WeeklyOpenGameContest", payload)
                    .then(({data}) => {
                        if (data.RES_CODE == "200") {
                            resolve(data);
                            // console.log(data);
                            commit("setWeeklyOpenGameContest", data);
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
