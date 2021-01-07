import Vue from 'vue';

export default Vue.extend({
  props: {
    page: {
      type: String,
      required: true,
    },
    props: {
      type: Object,
      required: false,
    },
    message: String,
  },
  methods: {
    click: function (ev: MouseEvent) {
      ev.preventDefault();
      window.ipcRenderer.send('navigate', this.page, this.props);
    },
  },
});