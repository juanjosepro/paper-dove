import { auth, db, fb } from '../firebase';

const state = {
  user: null,
  meta: {},
  userListener: () => { },
};

const getters = {
  // eslint-disable-next-line
  getUserUid(state) {
    return state.user.uid;
  },
};

const actions = {
  getCurrentUser() {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(
        (user) => {
          unsubscribe();
          resolve(user);
        },
        () => {
          reject();
        },
      );
    });
  },
  async updateMeta(context, { roomID, exit, uid }) {
    const ref = db.collection('users').doc(uid);
    const userDoc = await ref.get();

    if (!userDoc.exists) await ref.set({});

    const method = exit ? 'arrayRemove' : 'arrayUnion';

    await ref.update({
      connected: fb.firestore.FieldValue[method](roomID),
      [`joined.${roomID}`]: Date.now(),
    });
  },
  // eslint-disable-next-line
  async getMeta({ state, commit }) {
    function doSnapshot(doc) {
      commit('setMeta', doc.data());
    }

    const ref = db
      .collection('users')
      .doc(state.user.uid);

    const verify = await ref.get();

    // verificar si existe la propiedad joined
    if (verify.exists) {
      await ref.update({ connected: [] });

      const query = ref.onSnapshot(doSnapshot);

      commit('setUserListener', query);
    }
  },
  // eslint-disable-next-line
  async updateProfile({ commit, state }, { name, email, password }) {
    const user = auth.currentUser;

    if (name) {
      await user.updateProfile({
        displayName: name,
      });

      db.runTransaction(async (transaction) => {
        const query = await db
          .collectionGroup('messages')
          .where('userId', '==', state.user.uid)
          .get();

        query.forEach((doc) => {
          transaction.update(doc.ref, { userName: name });
        });
      });
    }
    if (email) {
      await user.updateEmail(email);
    }
    if (password) {
      await user.updatePassword(password);
    }

    commit('setUser', user);
  },
  async doLogin({ commit }, { email, password }) {
    await auth.signInWithEmailAndPassword(email, password);
    commit('setUser', auth.currentUser);
  },
  async doRegister({ commit }, { name, email, password }) {
    await auth.createUserWithEmailAndPassword(email, password);
    const user = auth.currentUser;
    await user.updateProfile({
      displayName: name,
    });
    commit('setUser', user);
  },
  async doLogout({ commit }) {
    await auth.signOut();
    commit('setUser', null);
  },
  async doReset(email) {
    await auth.sendPasswordResetEmail(email);
  },

};

const mutations = {
  // eslint-disable-next-line
  setUser(state, user) {
    state.user = user;
  },
  // eslint-disable-next-line
  setMeta(state, meta) {
    state.meta = meta;
  },
  // eslint-disable-next-line
  setUserListener(state, listener) {
    if (listener) {
      state.userListener = listener;
    } else {
      state.userListener();
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
