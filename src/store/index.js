import { createStore } from 'vuex';
import messages from './messages';
import rooms from './rooms';
import user from './user';
import utils from './utils';
import { auth } from '../firebase';

const store = createStore({
  state: {
    isLoading: true,
  },
  mutations: {
    setLoading(state, loading) {
      state.isLoading = loading;
    },
  },
  actions: {
    checkAuth({ commit, dispatch }) {
      // eslint-disable-next-line
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          commit('user/setUser', user);
          try {
            await dispatch('user/getMeta');
            await dispatch('rooms/getRooms');
            await dispatch('messages/getMessages');
          } catch (error) {
            console.error(error.message);
          }
        } else {
          commit('user/setMeta', null);
          commit('user/setUserListener', () => {});

          commit('rooms/setRooms', []);
          commit('rooms/setRoomsListener', () => {});

          commit('messages/setMessages', []);
          commit('messages/setMessagesListener', () => {});

          commit('user/setUser', null);
        }
      });
    },
  },
  modules: {
    messages,
    rooms,
    user,
    utils,
  },
});

export default store;

// Initial load
store.dispatch('checkAuth');
