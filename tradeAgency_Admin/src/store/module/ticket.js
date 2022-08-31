import axios from "@/plugins/axios";

export default {
    state: {
        ticketList: [],
        ticketCnt10mList: [],

    },
    getters: {
        getTicketList(state) {
            return state.ticketList;
        },
        getTicketCnt10mList(state) {
            return state.ticketCnt10mList;
        },

    },
    mutations: {
        setTicketList(state, ticketList) {
            return state.ticketList = ticketList;
        },
        setTicketCnt10mList(state, ticketCnt10mList) {
            return state.ticketCnt10mList = ticketCnt10mList;
        },



    },
    actions: {
        GETTICKETLIST: ({commit}, payload) => {

            return new Promise((resolve, reject) => {
                axios
                    .post("/api/v1/Get_TicketList", payload)
                    .then(({data}) => {
                        if (data.res_code === "200") {
                            resolve(data);
                            // console.log(data);
                            commit("setTicketList", data);
                        } else {
                            resolve(data);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        GETTICKETSTATUS: ({commit}, payload) => {

            return new Promise((resolve, reject) => {
                axios
                    .post("/api/v1/Get_TicketList", payload)
                    .then(({data}) => {
                        if (data.res_code === "200") {
                            resolve(data);
                            // console.log(data);
                            commit("setTicketStautsList", data);
                        } else {
                            resolve(data);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        GETTICKETCNT10M: ({commit}, payload) => {

            return new Promise((resolve, reject) => {
                axios
                    .post("/api/v1/Get_TicketCnt10m", payload)
                    .then(({data}) => {
                        if (data.res_code === "200") {
                            resolve(data);
                            // console.log(data);
                            commit("setTicketCnt10mList", data);
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
