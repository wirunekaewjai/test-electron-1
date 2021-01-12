import Vue from 'vue';
import { API, GraphQLResult } from '@aws-amplify/api';
import * as queries from '@/graphql/queries';

export default Vue.extend({
  name: 'wallet-total',
  props: {
    id: String,
  },
  data () {
    return {
      loading: true,
      total: 0,
    };
  },
  async mounted () {
    this.loading = true;

    try {
      const result = await API.graphql({
        query: queries.total,
        variables: {
          walletID: this.id,
        },
      }) as GraphQLResult<any>;

      this.total = result.data.total;
    }
    catch (err) {
      console.log(err);
    }

    this.loading = false;
  },
});