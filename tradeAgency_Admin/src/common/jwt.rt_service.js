//상수로 정의한 AT 문자열은 config.js 로 뺄 수있지 않을까?
const RT = "RT";

export const getRTToken = () => {
    return JSON.parse(window.localStorage.getItem(RT)).token;
};

export const saveRTToken = token => {
  window.localStorage.setItem(RT, JSON.stringify({token : token}));
};

export const destroyRTToken = () => {
  window.localStorage.removeItem(RT);
};

export default {getRTToken, saveRTToken, destroyRTToken };