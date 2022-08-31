import axios from "axios";
// import JwtAt_service from "@/common/jwt.at_service";

// //token 보내는 것. 향후에 공통으로 빼자
// let token = JwtAt_service.getATToken();


export default {
    state:{
        //품목코드를 가져오는 변수
        productCodeList:[],
        orderDetailList:[],
        //가맹점 목록 변수
        companyList:[],
        //발주목록
        orderList:[],
        search_st_dt:'',
        search_ed_dt:'',
        save_yn : 'Y',
        order_update: false,
        error:null
    },
    getters:{
        GetSearch_st_dt(state){
            return state.search_st_dt;
        },
        GetSearch_ed_dt(state){
            return state.search_ed_dt;
        },
        GetFranchise(state){
            return state.companyList;
        }
    },
    mutations:{
        //payload를 이용해서 두개를 받아올 수 있으므로
        SETPRODUCTCODELIST(state, productCodeList) {
            state.productCodeList = productCodeList;
        },
        SetOrderList(state, orderList) {
            state.orderList = orderList;
        },
        SetSerchStDt(state, st_dt) {
            state.search_st_dt = st_dt;
        },
        SetSerchEdDt(state, ed_dt) {
            state.search_ed_dt = ed_dt;
        },
        SetCompanyList(state,companyList ){
            state.companyList = companyList;
        },
        SetOrderDetailList(state, orderDetailList){
            state.orderDetailList = orderDetailList;
        },
        SaveOrder(state, save_yn){
            state.save_yn = save_yn;
        },
        SetUpdate(state){
            state.order_update = true;
        }

    },
    actions:{
        GETPRODUCTNAME: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                axios
                    .get(`/api/v1/getCodeList`, payload)
                    .then(({ data }) => {
                        if (data.res_code == "200") {
                            resolve(data);
                            //mutation 호출
                            commit("SETPRODUCTCODELIST", data);
                        }
                        else {
                            resolve(data);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        GetOrderList: ( {commit}, payload) => {

            // console.log('headerConfig:  ' + headerConfig);
            return new Promise((resolve, reject) => {
                axios
                    .post(`/api/v1/getOrderList`, payload, )
                    .then(({ data }) => {
                        if (data.res_code == "200") {
                            resolve(data);
                            //mutation 호출
                            // console.log("state_st_dt:" + payload.get("st_dt"));
                            // console.log("state_ed_dt:" + payload.get("ed_dt"));

                            commit("SetOrderList", data);
                            commit("SetSerchStDt", payload.get("st_dt"));
                            commit("SetSerchEdDt", payload.get("ed_dt"));
                        }
                        else {
                            resolve(data);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        GetCompanyList: ( {commit}, payload) => {

            // console.log('GetCompanyList:  ' + headerConfig);
            return new Promise((resolve, reject) => {
                axios
                    .post(`/api/v1/getCompany`, payload,  )
                    .then(({ data }) => {
                        if (data.res_code == "200") {
                            resolve(data);
                            // console.log('getCompanyList');
                            commit("SetCompanyList", data);
                        }
                        else {
                            resolve(data);
                        }
                    })
                    .catch((error) => {
                        console.log('getCompanyList error');
                        reject(error);
                    });
            });
        },
        GetOrderView: ( {commit}, payload) => {
            

            return new Promise((resolve, reject) => {
                axios
                    .post(`/api/v1/orderView`, payload, )
                    .then(({ data }) => {
                        if (data.res_code == "200") {
                            resolve(data);
                            //mutation 호출
                            // console.log('data 받음.');
                            commit("SetOrderDetailList", data);
                            // commit("SetSerchDt", payload.get("st_dt"), payload.get("ed_dt"));
                        }
                        else {
                            resolve(data);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        SaveOrder: ( {commit}, payload) => {

            return new Promise((resolve, reject) => {
                axios
                    .post(`/api/v1/setOrderList`, payload, )
                    .then(({ data }) => {
                        if (data.res_code == "200") {
                            resolve(data);
                            //mutation 호출
                            console.log('data 받음.');
                            commit("SaveOrder", 'Y');
                            // commit("SetSerchDt", payload.get("st_dt"), payload.get("ed_dt"));
                        }
                        else {
                            resolve(data);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        DeleteOrder: ( {commit}, payload) => {

            // console.log('payload' + payload.toString());
            return new Promise((resolve, reject) => {
                axios
                    .post(`/api/v1/orderUpdate`, payload, )
                    .then(({ data }) => {
                        if (data.res_code == "200") {
                            resolve(data);
                            //mutation 호출
                            // console.log('data 받음.');
                            commit("SaveOrder", 'Y');
                            commit("SetUpdate");
                            // commit("SetSerchDt", payload.get("st_dt"), payload.get("ed_dt"));
                        }
                        else {
                            resolve(data);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        }
    }
}