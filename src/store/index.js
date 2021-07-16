import { createStore } from 'vuex'
import messages from "./messages"
import rooms from "./rooms"
import user from "./user"
import utils from "./utils"
import { auth } from "../firebase";

const store = createStore({
  state: {
    isLoading: true,
  },
  mutations: {
    setLoading(state, loading){
      state.isLoading = loading
    }
  },
  actions: {
    checkAuth({ commit, dispatch }) {
      auth.onAuthStateChanged(function(user) {
        if (user) {
          commit("user/setUser", user)
          dispatch("rooms/getRooms");
        } else {
          commit("user/setUser", null)
          commit("rooms/setRooms", []);
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
