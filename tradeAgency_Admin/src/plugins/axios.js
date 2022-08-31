"use strict";

import Vue from "vue";
// import store from "@/store/index"
import axios from "axios";
import JwtAt_service from "@/common/jwt.at_service";
import JwtRt_service from "@/common/jwt.rt_service";
import diffMin from "@/common/common_fn_service"

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 기존엔 .env 파일에 환경변수로 지정해둔 API요청 URL을 main.js 에서 axios의 기본 url로 지정해줌
// axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;

/*let headerConfig = {
    headers: {
            Authorization: "Bearer " + at,

    },
};*/
// console.log(headerConfig);

// let apiInstance = axios.create(headerConfig);
let apiInstance = axios.create();

// Request (요청) 객체에 대한 interceptor 구현
apiInstance.interceptors.request.use(
    (config) => {
        let gType = window.localStorage.getItem('selectedGame');

        if(gType === '2WinChance') {
            // config.baseURL = 'http://192.168.0.205:8081/'
            config.baseURL = process.env.VUE_APP_API_BASE_URL_TWOWINCHANCE;
            console.log('인터셉터 작용중임 === 2WinChance');

        }else if(gType === '2WinPlus') {
            // config.baseURL = 'http://localhost:8082/'
            config.baseURL = process.env.VUE_APP_API_BASE_URL_TWOWINPLUS;
            console.log('인터셉터 작용중임 === 2WinPlus');
        }

        // console.log('start : 인터셉터 탔음');
        let at = JwtAt_service.getATToken();
        let rt = JwtRt_service.getRTToken();
        // console.log("at :" + at);
        let headerConfig = {
              headers: {
                Authorization: "Bearer " + at,
              },
            };
        // console.log("rt :" + rt);
        // config에 헤더 주입
        config.headers.Authorization = `Bearer ${at}`;


        // AT만료시간 가져오기.
        const ATexpDt = window.localStorage.getItem("ATexpDt");
        //현재 시간 , AT만료시간 비교
        // console.log("ATexpDt  : " + ATexpDt );

        // let startTime = new Date('2022/06/09 12:05');
        // let endTime = new Date('2022/06/09 12:10');

        let endTime = new Date(Number(ATexpDt));
        let startTime = new Date();
        // console.log("start Time: " + startTime);

        // console.log(rt);
        // console.log("기존의 at : " + at);
        //AT 만료시간이되면, RT Reissue 요청 후 새로운 AT,AT만료시간 반환받기.
        if (diffMin.getBetweenDiffMinutes(startTime, endTime) ) {

            const form = new FormData()
            form.delete('rt')
            form.set('rt', rt)

            axios
                .post("/api/v1/ReIssue", form, headerConfig)
                .then(({data}) => {
                    console.log(data);
                    if (data.res_code === "200") {
                        // Back에서 갱신된 AT를 헤더에도 다시 정의, 우리는 localstorage의 기존 AT를 교체해주기만 하면됨.
                        // console.log("성공 후 at : " + at);
                        // console.log("성공 후 새로운 data의 at:" +  response.at);
                        // console.log("response.data : " + data);
                        // console.log("response.data.at : " + data.at);
                        // console.log("response.data.at : " + data.expDt);

                        window.sessionStorage.removeItem("AT");
                        window.sessionStorage.setItem("AT", JSON.stringify({token : data.at}));
                        window.localStorage.removeItem("ATexpDt");
                        window.localStorage.setItem("ATexpDt", data.expDt);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    console.log("노일치");
                    //시간 초과시, 로그인 페이지로 이동 및 localStorage 전체 삭제
                    // store.commit('PURGEAUTH')
                    // location.href="/";
                });

            // console.log('end : 인터셉터 탔음');
        }

        return config;
    },
    (error => {
        console.log("노일치2");
        return Promise.reject(error);
    })
);

// Response (응답) 객체에 대한 interceptor 구현
apiInstance.interceptors.response.use(
    function (response) {
        // Do something with response data
        return response;
    },
    function (error) {
        // Do something with response error
        return Promise.reject(error);
    }
);

// 위에 새로 정의해준 axios 객체를 global로 설정
Plugin.install = function (Vue) {

    Vue.axios = apiInstance;
    window.axios = apiInstance;
    Object.defineProperties(Vue.prototype, {
        axios: {
            get() {
                return apiInstance;
            },
        },
        $axios: {
            get() {
                return apiInstance;
            },
        },
    });
};

Vue.use(Plugin);

export default apiInstance;
