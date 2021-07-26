import { db, storage } from '../firebase';

const state = {
  messages: [],
  messagesListener: () => {},
};

const getters = {
  // eslint-disable-next-line
  getMessages: (state) => (id) => state.messages.filter((message) => message.roomId === id)
};

const actions = {
  async getMessages({ commit }) {
    function doSnapshot(querySnapshot) {
      const messages = [];
      querySnapshot.forEach((doc) => {
        const message = doc.data();
        message.id = doc.id;
        messages.unshift(message);
      });
      commit('setMessages', messages);
    }

    const query = db
      .collectionGroup('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(doSnapshot);

    commit('setMessagesListener', query);
  },
  async uploadMessageFile({ rootGetters }, { roomID, file, type }) {
    const timestamp = Date.now();
    const userUID = rootGetters['user/getUserUid'];
    let ext;
    const metadata = {};

    if (type === 'photo') {
      ext = 'jpg';
      metadata.contentType = 'image/jpeg';
    } else {
      ext = 'wav';
      metadata.contentType = 'audio/wav';
    }

    const uploadPhoto = () => {
      const fileName = `rooms/${roomID}/messages/${userUID}-${timestamp}.${ext}`;
      return storage.ref(fileName).put(file, metadata);
    };

    function getDownloadURL(ref) {
      return ref.getDownloadURL();
    }

    try {
      const upload = await uploadPhoto();
      return await getDownloadURL(upload.ref);
    } catch (error) {
      throw Error(error.message);
    }
  },
  async createMessage({ rootState }, {
    roomID, message, photo, audio,
  }) {
    try {
      await db
        .collection('rooms')
        .doc(roomID)
        .collection('messages')
        .add({
          userId: rootState.user.user.uid,
          userName: rootState.user.user.displayName,
          roomId: roomID,
          message,
          photo,
          audio,
          createdAt: Date.now(),
        });
    } catch (error) {
      console.error(error.message);
    }
  },
  async deleteFile(context, file) {
    const fileRef = storage.refFromURL(file);
    await fileRef.delete();
  },
  async deleteMessage(context, { roomID, messageID }) {
    await db
      .collection('rooms')
      .doc(roomID)
      .collection('messages')
      .doc(messageID)
      .delete();
  },
};

const mutations = {
  // eslint-disable-next-line
  setMessages(state, messages) {
    state.messages = messages;
  },
  // eslint-disable-next-line
  setMessagesListener(state, listener) {
    if (listener) {
      state.messagesListener = listener;
    } else {
      state.messagesListener();
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
