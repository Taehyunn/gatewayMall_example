// import axios from "@/plugins/axios";

export default {
    state: {
        itrdDialogToggle: false,
        itrdIdx: undefined,
    },
    getters: {
      getItrdDialogToggle(state) {
          return state.itrdDialogToggle;
      },
    },
    mutations: {
        OPEN_ITRDREGDIALOG(state, itrdIdx) {
            state.itrdDialogToggle = true;
            state.itrdIdx = itrdIdx;
        },
        CLOSE_ITRDREGDIALOG(state) {
            state.itrdDialogToggle = false;
        }
    },
    actions: {
        OPEN_ITRDREGDIALOG: ({commit}, itrdIdx) => {
            commit("OPEN_ITRDREGDIALOG", itrdIdx);
        },
        CLOSE_ITRDREGDIALOG: ({commit}) => {
            commit('CLOSE_ITRDREGDIALOG');
        },
    }
}