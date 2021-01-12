
type User = {
  name: string;
  email: string;
};

type State = {
  user: User;
};

const state: State = {
  user: {
    name: '',
    email: '',
  },
};

const mutations = {
  update (state: State, user: User) {
    state.user = user;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};