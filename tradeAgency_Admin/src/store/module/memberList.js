import axios from "@/plugins/axios";

export default {
    state: {
        allMemberList: [],
        memberPaymentHistoryList: [],
        memberLoginHistoryList: [],
        memberFPHistoryList: [],
        GiveGoldToMember: [],
        SignIn: [],


    },
    getters: {

        getAllMemberList(state) {
            return state.allMemberList;
        },
        getMemberPaymentHistoryList(state) {
            return state.memberPaymentHistoryList;
        },
        getMemberLoginHistoryList(state) {
            return state.memberLoginHistoryList;
        },
        getMemberFPHistoryList(state) {
            return state.memberFPHistoryList;
        },
        getGiveGoldToMember(state) {
            return state.GiveGoldToMember;
        },
        getSignIn(state) {
            return state.SignIn;
        },


    },
    mutations: {

        setAllMemberList(state, allMemberList) {
            return state.allMemberList = allMemberList;
        },
        setMemberPaymentHistoryList(state, memberPaymentHistoryList) {
            return state.memberPaymentHistoryList = memberPaymentHistoryList;
        },
        setMemberLoginHistoryList(state, memberLoginHistoryList) {
            return state.memberLoginHistoryList = memberLoginHistoryList;
        },
        setMemberFPHistoryList(state, memberFPHistoryList) {
            return state.memberFPHistoryList = memberFPHistoryList;
        },
        setGiveGoldToMember(state, GiveGoldToMember) {
            return state.GiveGoldToMember = GiveGoldToMember;
        },
        setSignIn(state, SignIn) {
            return state.SignIn = SignIn;
        },




    },
    actions: {

        GETALLMEMBERLIST: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                axios
                    .post("/api/v1/Get_Members", payload)
                    .then(({data}) => {
                        if (data.res_code === "200") {
                            resolve(data);
                            // console.log(data);
                            commit("setAllMemberList", data);
                        } else {
                            resolve(data);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        GETPAYMENTHISTORY: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                axios
                    .post("/api/v1/Get_MemberPaymentHistory", payload)
                    .then(({data}) => {
                        if (data.res_code === "200") {
                            resolve(data);
                            // console.log(data);
                            commit("setMemberPaymentHistoryList", data);
                        } else {
                            resolve(data);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        GETLOGINHISTORY: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                axios
                    .post("/api/v1/Get_MemberLoginHistory", payload)
                    .then(({data}) => {
                        if (data.res_code === "200") {
                            resolve(data);
                            // console.log(data);
                            commit("setMemberLoginHistoryList", data);
                        } else {
                            resolve(data);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        GETFPHISTORY: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                axios
                    .post("/api/v1/Get_MemberFPHistory", payload)
                    .then(({data}) => {
                        if (data.res_code === "200") {
                            resolve(data);
                            // console.log(data);
                            commit("setMemberFPHistoryList", data);
                        } else {
                            resolve(data);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        GETGOLDTOMEMBER: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                axios
                    .post("/api/v1/ISET_setGiveGoldToMember", payload)
                    .then(({data}) => {
                        if (data.res_code === "200") {
                            resolve(data);
                            // console.log(data);
                            commit("setGiveGoldToMember", data);
                        } else {
                            resolve(data);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        GETSIGNIN: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                axios
                    .post("/api/v1/ISET_SignIn", payload)
                    .then(({data}) => {
                        if (data.res_code === "200") {
                            resolve(data);
                            // console.log(data);
                            commit("setSignIn", data);
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
