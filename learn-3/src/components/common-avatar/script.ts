import Vue from 'vue';

export default Vue.extend({
  name: 'component-common-avatar',
  props: {
    photo: {
      type: String,
      required: false,
    },

    name: {
      type: String,
      required: true,
    },

    size: {
      type: [Number, String],
      required: false,
      default: '32',
    },
  },

  computed: {
    src () {
      return this.photo ?? '';
    },

    alt () {
      const name = this.name as string;

      if (typeof name !== 'string' || name.length === 0)
      {
        return '';
      }

      const [a, b] = name.split(' ');

      const c = a?.length > 0 ? a[0].toUpperCase() : '';
      const d = b?.length > 0 ? b[0].toUpperCase() : '';

      return [c, d].join('');
    },
  },
});