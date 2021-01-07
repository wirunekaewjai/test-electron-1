import Vue from 'vue';

export default Vue.extend({
  name: 'wk-link',
  props: {
    page: {
      type: String,
      required: true,
    },
    props: {
      type: Object,
      required: false,
    },
  },
  methods: {
    click: function () {
      window.ipcRenderer.send('navigate', this.page, this.props);
    },
  },
});