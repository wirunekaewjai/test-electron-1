type State = {
  message: string;
};

const state = {
  message: '',
};

const mutations = {
  show (state: State, message: string) {
    state.message = message;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};