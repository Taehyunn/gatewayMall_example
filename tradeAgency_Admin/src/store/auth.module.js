import ApiService from "@/common/api.service";
import JwtRt_service from "@/common/jwt.rt_service";
import JwtAt_service from "@/common/jwt.at_service";

import {
    LOGIN,
    LOGOUT,
    REGISTER,
    CHECK_AUTH,
    UPDATE_USER
} from "./actions.type";
import { SET_AUTH, PURGE_AUTH, SET_ERROR } from "./mutations.type";


const state = {
    errors: null,
    user: {},
    isAuthenticated: !!JwtRt_service.getRTToken()
};

const getters = {
    currentUser(state) {
        return state.user;
    },
    isAuthenticated(state) {
        return state.isAuthenticated;
    }
};

const actions = {
    //real world module
    [LOGIN](context, credentials) {
        return new Promise(resolve => {
            ApiService.post('api/v1/LoginReq', { user: credentials })
                .then(({ data }) => {
                    context.commit(SET_AUTH, data.user);
                    resolve(data);
                })
                .catch(({ response }) => {
                    context.commit(SET_ERROR, response.data.errors);
                });
        });
    }



};

const mutations = {
  [SET_ERROR](state, error) {
      state.errors = error;
  },
  [SET_AUTH](state, user) {
      state.isAuthenticated = true;
      state.user = user;
      state.errors = {};
      JwtRt_service.saveATToken(state.user.token);
  }
};

export default {
    state,
    actions,
    mutations,
    getters
};