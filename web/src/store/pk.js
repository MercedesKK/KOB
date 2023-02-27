export default {
  state: {
    status: "matching", // matching playing
    socket: null,
    opponent_username: "",
    opponent_photo: "",
  },
  getters: {},
  mutations: {
    updateSocket(state, socket) {
      state.socket = socket;
    },

    updateOpponent(state, opponent) {
      state.opponent_username = opponent.opponent_username;
      state.opponent_photo = opponent.opponent_photo;
      console.log(state.opponent_photo);
    },
    updateStatus(state, status) {
      state.status = status;
    },
  },
  actions: {},
  modules: {},
};
