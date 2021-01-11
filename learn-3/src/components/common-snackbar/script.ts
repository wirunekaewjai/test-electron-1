import Vue from 'vue';

export default Vue.extend({
  name: 'component-common-snackbar',
  data: () => ({
    open: false,
    message: '',

    unsubscribes: [] as Function[],
  }),

  created () {
    this.unsubscribes.push(
      this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'snackbar/show') {
          this.message = state?.snackbar?.message ?? '';
          this.open = true;
        }
      })
    );
  },

  beforeDestroy () {
    for (const unsubscribe of this.unsubscribes) {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    }
  },
});