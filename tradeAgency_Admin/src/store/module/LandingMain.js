import axios from "@/plugins/axios";

export default {
    state: {
        MainHeaderList: [],
        MainContestList: [],
        MainTicketList: [],
        MainUserList: [],


    },
    getters: {

        getMainHeaderList(state) {
            return state.MainHeaderList;
        },
        getMainContestList(state) {
            return state.MainContestList;
        },
        getMainTicketList(state) {
            return state.MainTicketList;
        },
        getMainUserList(state) {
            return state.MainUserList;
        },



    },
    mutations: {

        setMainHeaderList(state, MainHeaderList) {
            return state.MainHeaderList = MainHeaderList;
        },
        setMainContestList(state, MainContestList) {
            return state.MainContestList = MainContestList;
        },
        setMainTicketList(state, MainTicketList) {
            return state.MainTicketList = MainTicketList;
        },
        setMainUserList(state, MainUserList) {
            return state.MainUserList = MainUserList;
        },



    },
    actions: {

        GETMAINHEADER: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                axios
                    .post("/api/v1/Get_MainHeader", payload)
                    .then(({data}) => {
                        if (data.res_code === "200") {
                            resolve(data);
                            // console.log(data);
                            commit("setMainHeaderList", data);
                        } else {
                            resolve(data);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        GETMAINCONTEST: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                axios
                    .post("/api/v1/Get_MainContest", payload)
                    .then(({data}) => {
                        if (data.res_code === "200") {
                            resolve(data);
                            // console.log(data);
                            commit("setMainContestList", data);
                        } else {
                            resolve(data);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        GETMAINTICKET: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                axios
                    .post("/api/v1/Get_MainTicket", payload)
                    .then(({data}) => {
                        if (data.res_code === "200") {
                            resolve(data);
                            // console.log(data);
                            commit("setMainTicketList", data);
                        } else {
                            resolve(data);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        GETMAINUSER: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                axios
                    .post("/api/v1/Get_MainUser", payload)
                    .then(({data}) => {
                        if (data.res_code === "200") {
                            resolve(data);
                            // console.log(data);
                            commit("setMainUserList", data);
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
