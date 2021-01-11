// import Store from 'electron-store';

export default function create () {
  const states = {
    message: '',
  };
  
  const mutations = {
    show (state: typeof states, message: string) {
      state.message = message;
    },

    // setOpen (state: typeof states, open: boolean) {
    //   state.open = open;
    //   console.log('snackbar:', open);
    // },
  
    // setMessage (state: typeof states, message: string = '') {
    //   state.message = message;
    //   console.log('snackbar:', message);
    // },
  };
  
  return {
    namespaced: true,
    states,
    mutations,
  };
}