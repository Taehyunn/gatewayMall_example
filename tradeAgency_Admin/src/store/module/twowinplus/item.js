import axios from "@/plugins/axios";

export default {

    state: {

    },
    getters: {

    },
    mutations: {

    },

    actions: {
        SETITEMIMAGEINFO: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                axios.create()
                    .post(`http://localhost:8086/ISet_ItemImage`, payload)
                    .then(({data}) => {
                        if (data.res_code == "200") {
                            resolve(data);
                            commit('', '');
                        } else {
                            resolve(data);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },

        SETITEMINFO: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                axios
                    .post(`/api/v1/ISet_Item`, payload)
                    .then(({data}) => {
                        if (data.res_code == "200") {
                            resolve(data);
                            commit('', '');
                        } else {
                            resolve(data);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        GETITEMLIST: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                axios
                    .post(`/api/v1/Get_ItemList`, payload)
                    .then(({data}) => {
                        if (data.res_code == "200") {
                            resolve(data);
                            commit('', '');
                        } else {
                            resolve(data);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
    }
}