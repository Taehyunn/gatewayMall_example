//상수로 정의한 AT 문자열은 config.js 로 뺄 수있지 않을까?
const AT = "AT";

export const getATToken = () => {
    return  JSON.parse(window.sessionStorage.getItem("AT")).token;
};

export const saveATToken = token => {
  window.sessionStorage.setItem(AT, JSON.stringify({token : token }));
};

export const destroyATToken = () => {
  window.sessionStorage.removeItem(AT);
};



export default {getATToken, saveATToken, destroyATToken };