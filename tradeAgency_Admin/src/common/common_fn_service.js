// import JwtAt_service from "@/common/jwt.at_service";

import XLSX2 from "xlsx";
import store from "@/store/index"

//단위 세자리마다 ','
export const commaField = (number) => {
  const parts = number.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

//AT만료시간 비교
export const getBetweenDiffMinutes = (startTime, endTime) => {
  let diffMin = startTime.getTime() - endTime.getTime();
  let elapsedMin = parseInt( diffMin /  60000);
  console.log("AT 만료시간 현재 차이(분) : " + elapsedMin);
  // console.log("startTime : " + startTime.getTime());
  // console.log("endTime : " + endTime.getTime());
  if (elapsedMin == -5 || (elapsedMin > -5 && elapsedMin < -1) ) {
    return true;
  }
  else if(elapsedMin >= -1) {
    console.log("세션이 만료되어 로그아웃 됩니다.");
    alert("세션이 만료되어 로그아웃 됩니다.");
    store.commit('PURGEAUTH');
    location.href = "/login"

  }

};
export const  makeExcelFile5 = (totalList) => {

  const workBook = XLSX2.utils.book_new();
  const workSheet = XLSX2.utils.json_to_sheet(totalList);
  XLSX2.utils.book_append_sheet(workBook, workSheet, 'example');
  XLSX2.writeFile(workBook, 'example.xlsx');
};



export default { commaField, getBetweenDiffMinutes,makeExcelFile5 };





//합계
// sumField(key) {
//   return this.returnOrderList.reduce((a, b) => a + (b[key] || 0), 0)
// },
// exprot const setToken = () => {
//   const expDt = window.localStorage.getItem("expDt");
//   window.localStorage.removeItem("expDt");
//   window.localStorage.setItem("expDt", new Date().getTime());
//   const currentDate = new Date().getTime();
//   // console.log(currentDate);
//   if (expDt < currentDate ){
//       //시간 초과면 로그인 페이지로
//       //     console.log("토큰 만료시간 초과")
//
//       // store.commit('PURGEAUTH')
//
//
//   } else {
//
//       //아직 유효하면 토큰 넘겨주기
//
//   }
// }


