import { createStore } from 'vuex'
import messages from "./messages"
import rooms from "./rooms"
import user from "./user"
import utils from "./utils"
import { auth } from "../firebase";

const store = createStore({
  state: {
  },
  mutations: {
  },
  actions: {
    checkAuth({ commit }) {
      auth.onAuthStateChanged(function(user) {
        if (user) {
          commit("user/setUser", user)
        } else {
          commit("user/setUser", null)
        }
      })
    }
  },
  modules: {
    messages,
    rooms,
    user,
    utils,
  }
});

export default store;

//Initial load
store.dispatch("checkAuth")
