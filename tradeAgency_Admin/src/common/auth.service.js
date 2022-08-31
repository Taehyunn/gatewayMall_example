const INFO = "INFO";

export const getInfoToken = () => {
    return window.localStorage.getItem(INFO);
};

export const saveInfoToken = token => {

  window.localStorage.setItem(INFO, token);
  // console.log(JSON.stringify(token));
};

export const destroyInfoToken = () => {
  window.localStorage.removeItem(INFO);
};

export default {getInfoToken, saveInfoToken, destroyInfoToken };