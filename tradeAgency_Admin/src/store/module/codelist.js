import axios from "axios";
// import JwtAt_service from "@/common/jwt.at_service";

//token 보내는 것.
// let token = JwtAt_service.getATToken();
// let header = 'Bearer ' + token;
// let headerConfig = {
//     headers: {
//         'Authorization' : 'Bearer ' + token
//     }
// }

export default {
    state:{
        detailCodeList:[],
        codeTotalPages:0, //전체 페이지수
        codeTotalItems:0, //전체 갯수
        codeCurrentPage:0, //현재 페이지 수
        size:10,  //몇개씩 불러올 건지를 정하는 변수
        cmmncdId:'0005',
        error:null,
    },
    getters:{ 
        getCodeCurrentPage(state){
            return state.currentPage;
        },
        getCommonId(state){
            return state.cmmncdId;
        },
        getDetailCodeList(state){
            return state.detailCodeList;
        },
        getCodeTotalItems(state){
            return state.codeTotalItems;
        },
        getCodeTotalPage(state){
            return state.codeTotalPages;
        }

    },
    mutations:{
        //값이 호출되면 다시 정의하도록 하자.
        SETCODELIST(state, detailList){
            state.detailCodeList = detailList; 
        },
        SetCodeTotalPage(state, codeTotalPage){
            state.codeTotalPages = codeTotalPage;
        },
        SetCodeTotalItems(state, codeTotalItem){
            state.codeTotalItems = codeTotalItem;
        },
        SetCodeCurrentPage(state, codeCurrentPage){
            state.codeCurrentPage = codeCurrentPage;
        }
    },
    actions: {
        FETCHCODELIST: ({commit}, payload) => {
            // console.log("code List : " + payload.get("page"));
            return new Promise((resolve, reject) => {
                axios
                    .post(`/api/v1/getCmmncdDetails`, payload)
                    .then(({ data }) => {
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
        SAVEDETAILCODE:( {commit}, payload ) => {
            // console.log('신규 저장 : '+ payload);
            // console.log(JwtAt_service.getATToken());

            return new Promise((resolve, reject) => {
               axios
                   .post('/api/v1/saveItem', payload,  )
                   .then(({data}) => {
                       if(data.res_code === "200"){
                           resolve(data);
                           //저장후 다시 리스트를 여기서 호출해도 되는것인가?
                           commit("FETCHCODELIST",
                            {
                                "cmmncdId": "0005",
                                "size": "10",
                                "page": "1"
                            }
                            );
                       } else {
                           resolve(data);
                       }
                   })
                   .catch((error) =>{
                       reject(error);
                   });
            });
        },
        UPDATECODE:( {commit}, payload ) => {
            // console.log('수정 토큰 : '+ JwtAt_service.getATToken());

            // axios.defaults.headers.common["Authorization"] = `Bearer ${JwtAt_service.getRTToken()}`;
            // console.log(headerConfig);
            return new Promise((resolve, reject) => {
               axios
                   .post('/api/v1/saveDetailCd', payload, )
                   .then(({data}) => {
                       if(data.res_code === "200"){
                           resolve(data);
                              commit("SETCODELIST", '');
                       } else {
                           resolve(data);
                       }
                   })
                   .catch((error) =>{
                       reject(error);
                   });
            });
        },
    }
}