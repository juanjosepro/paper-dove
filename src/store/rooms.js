import { db } from "../firebase";

const state = {
  rooms: [],
}

const actions = {
  async createRoom({ rootState }, { name, description }) {
    await db.collection("rooms").add({
      name, 
      description,
      createdAt: Date.now(),
      adminUid: rootState.user.user.uid,
      adminName: rootState.user.user.displayName,
    })
  },
  async getRooms({ commit }) {
    const query = db.collection("rooms").orderBy("createdAt", "desc");

    query.onSnapshot(querySnapshot => {
      const rooms = [];
      commit("setLoading", true, { root: true});

      querySnapshot.forEach(doc => {
        let room = doc.data();
        room.id = doc.id
        rooms.push(room)
      })

      commit("setLoading", false, { root: true});
      commit("setRooms", rooms)
    })
  },
  async getRoom(roomID) {
    console.log('que')
    const r =  await db
      .collection("rooms")
      .doc(roomID)
      .get();

      console.log(r)
    return r;
  },
  async updateRoom(context, { roomId, name, description }) {
    const roomData = {};
  
    if (name) {
      roomData.name = name;
    }
    if (description) {
      roomData.description = description;
    }
  
    await db
      .collection("rooms")
      .doc(roomId)
      .update(roomData);
  },
}

const mutations = {
  setRooms(state, rooms) {
    state.rooms = rooms
  }
}

const getters = {
  getRoom: state => id => {
    return state.rooms.find(room => room.id === id);
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}