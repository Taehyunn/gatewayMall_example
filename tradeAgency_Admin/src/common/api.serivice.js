// import Vue from "vue";
// import axios from "axios";
// import VueAxios from "vue-axios";
// import { API_BASEURL } from "@/common/config";
// // import JwtAt_service from "@/common/jwt.at_service";
// // import JwtRt_service from "@/common/jwt.rt_service";
//
// const ApiService = {
//     init(){
//         Vue.use(VueAxios, axios);
//         Vue.axios.defaults.baseURL = API_BASEURL;
//     },
//
//     // setHeader() {
//     //     Vue.axios.defaults.headers.common[
//     //         "Authorization"
//     //     ] =  `Token ${JwtRt_service.getRTToken()}`;
//     // },
//
//     query(resource, params) {
//         return Vue.axios.get(resource, params).catch(error =>{
//             throw new Error('APIService ${error}');
//         });
//     },
//
//     get(resource, slug = "") {
//         return Vue.axios.get(`${resource}/${slug}`).catch(error => {
//             throw new Error(`[RWV] ApiService ${error}`);
//         });
//     },
//
//     post(resource, params) {
//         return Vue.axios.post(`${resource}`, params);
//     }
//
// };
// export default ApiService;

export const IMAGE_URL = "http://dev.2winchance.com";
export default IMAGE_URL;
