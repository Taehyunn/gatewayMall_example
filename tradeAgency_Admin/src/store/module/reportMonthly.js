import axios from "@/plugins/axios";

export default {
    state: {
        monthlyJoinUserListt: [],
        monthlyGameContestList: [],
        monthlyJoinGameList: [],
        monthlyTicketCntList: [],
        monthlyARPList: [],


    },
    getters: {

        getmonthlyJoinUserListt(state) {
            return state.monthlyJoinUserListt;
        },
        getmonthlyGameContestList(state) {
            return state.monthlyGameContestList;
        },
        getmonthlyJoinGameList(state) {
            return state.monthlyJoinGameList;
        },
        getmonthlyTicketCntList(state) {
            return state.monthlyTicketCntList;
        },
        getmonthlyARPList(state) {
            return state.monthlyARPList;
        },


    },
    mutations: {

        setmonthlyJoinUserListt(state, monthlyJoinUserList) {
            return state.monthlyJoinUserListt = monthlyJoinUserList;
        },
        setMonthlyGameContestList(state, monthlyGameContestList) {
            return state.monthlyGameContestList = monthlyGameContestList;
        },
        setMonthlyJoinGameList(state, monthlyJoinGameList) {
            return state.monthlyJoinGameList = monthlyJoinGameList;
        },
        setMonthlyTicketCntList(state, monthlyTicketCntList) {
            return state.monthlyTicketCntList = monthlyTicketCntList;
        },
        setMonthlyARPList(state, monthlyARPList) {
            return state.monthlyARPList = monthlyARPList;
        },


    },
    actions: {

        GETMONTHLISTS: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                axios
                    .post("/api/v1/Get_MonthlyJoinUser", payload)
                    .then(({data}) => {
                        if (data.res_code === "200") {
                            resolve(data);
                            // console.log(data);
                            commit("setmonthlyJoinUserListt", data);
                        } else {
                            resolve(data);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        GETMONTHLYGAMECONTEST: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                axios
                    .post("/api/v1/Get_MonthlyGameContest", payload)
                    .then(({data}) => {
                        if (data.res_code === "200") {
                            resolve(data);
                            // console.log(data);
                            commit("setMonthlyGameContestList", data);
                        } else {
                            resolve(data);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        GETMONTHLYJOINGAME: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                axios
                    .post("/api/v1/Get_MonthlyJoinGame", payload)
                    .then(({data}) => {
                        if (data.res_code === "200") {
                            resolve(data);
                            // console.log(data);
                            commit("setMonthlyJoinGameList", data);
                        } else {
                            resolve(data);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        GETMONTHLYTICKETCNT: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                axios
                    .post("/api/v1/Get_MonthlyTicket", payload)
                    .then(({data}) => {
                        if (data.res_code === "200") {
                            resolve(data);
                            // console.log(data);
                            commit("setMonthlyTicketCntList", data);
                        } else {
                            resolve(data);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        GETMONTHLYARP: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                axios
                    .post("/api/v1/Get_MonthlyARP", payload)
                    .then(({data}) => {
                        if (data.res_code === "200") {
                            resolve(data);
                            // console.log(data);
                            commit("setMonthlyARPList", data);
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
