import { db, storage } from '../firebase';

const state = {
  rooms: [],
  roomsListener: () => {},
};

const actions = {
  getNewRoomId() {
    return db.collection('rooms').doc();
  },
  async uploadRoomImage(context, { roomID, file }) {
    const uploadPhoto = () => {
      const fileName = `rooms/${roomID}/${roomID}-image.jpg`;
      return storage.ref(fileName).put(file);
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
  async createRoom({ rootState }, {
    name, description, image, roomID,
  }) {
    await db.collection('rooms').doc(roomID).set({
      name,
      description,
      createdAt: Date.now(),
      adminUid: rootState.user.user.uid,
      adminName: rootState.user.user.displayName,
      image,
    });
  },
  async getRooms({ commit }) {
    function doSnapShot(querySnapshot) {
      commit('setLoading', true, { root: true });

      querySnapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          commit('createRoom', {
            roomData: change.doc.data(),
            id: change.doc.id,
          });
        }

        if (change.type === 'modified') {
          commit('updateRoom', {
            index: change.newIndex,
            roomData: change.doc.data(),
            id: change.doc.id,
          });
        }

        if (change.type === 'removed') {
          commit('removeRoom', change.oldIndex);
        }
      });
      commit('setLoading', false, { root: true });
    }

    const query = db.collection('rooms').orderBy('createdAt', 'desc').onSnapshot(doSnapShot);

    commit('setRoomsListener', query);
  },
  async getRoom({ getters }, roomID) {
    let room = getters.getRoom(roomID);

    if (!room) {
      room = await db
        .collection('rooms')
        .doc(roomID)
        .get();

      if (!room.exists) throw new Error('No se pudo encontrar esas sala');

      room = room.data();
    }

    return room;
  },
  async updateRoom(context, {
    roomId, name, description, image,
  }) {
    const roomData = {};

    if (name) {
      roomData.name = name;
    }
    if (description) {
      roomData.description = description;
    }

    roomData.image = image;

    await db
      .collection('rooms')
      .doc(roomId)
      .update(roomData);
  },
  async removeRoom(context, roomID) {
    const room = db.collection('rooms').doc(roomID);
    // eslint-disable-next-line
    const messages = room.collection('messages').onSnapshot(doSnapshot);
    async function doSnapshot(snapshot) {
      snapshot.docs.forEach(async (doc) => {
        await room
          .collection('messages')
          .doc(doc.id)
          .delete();
      });
      messages(); // Unsub
      await room.delete();
    }
  },
};

const mutations = {
  // eslint-disable-next-line
  setRoomsListener(state, listener) {
    if (listener) {
      state.roomsListener = listener;
    } else {
      state.roomsListener();
    }
  },
  // eslint-disable-next-line
  setRooms(state, rooms) {
    state.rooms = rooms;
  },
  // eslint-disable-next-line
  createRoom(state, { roomData, id }) {
  // eslint-disable-next-line
    roomData.id = id;
    state.rooms.push(roomData);
  },
  // eslint-disable-next-line
  updateRoom(state, { index, roomData, id }) {
  // eslint-disable-next-line
    roomData.id = id;
    state.rooms[index] = roomData;
  },
  // eslint-disable-next-line
  removeRoom(state, index) {
    state.rooms.splice(index, 1);
  },
};

const getters = {
  // eslint-disable-next-line
  getRoom: (state) => (id) => state.rooms.find((room) => room.id === id),
  // eslint-disable-next-line
  roomsByDate: (state) => state.rooms.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
