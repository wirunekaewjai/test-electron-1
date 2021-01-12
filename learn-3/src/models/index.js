// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Transaction, Wallet } = initSchema(schema);

export {
  Transaction,
  Wallet
};