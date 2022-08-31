
export default{
    install(Vue){
        //https://bman-note.tistory.com/9
        //날짜 비교 함수
        Vue.prototype.$dateValidation = function(prevDate, currentDate){
            if(prevDate > currentDate) {
                console.log(prevDate,currentDate);
                return false;
            }
            else{
                return true;
            }
        }
        // Vue.prototype.$atValidation = function(){
        //     let mockDate =  new Date().getTime();
        //     const expDt = window.localStorage.getItem("expDt");
        //     window.localStorage.removeItem("expDt");
        //     window.localStorage.setItem("expDt", mockDate);
        //     // const expiredTime = new Date(expDt).toLocaleTimeString().substr(3);
        //     const currentDate = new Date().getTime();
        //     // console.log(currentDate);
        //     if (expDt < currentDate ){
        //         //시간 =초과면 로그인 페이지로
        //         return false;
        //     } else {
        //         //아직 유효하면 토큰 넘겨주기
        //         return true;
        //     }
        // }

    }
}

export const common = {

}