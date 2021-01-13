/* Amplify Params - DO NOT EDIT
	API_LEARN3_GRAPHQLAPIENDPOINTOUTPUT
	API_LEARN3_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import axios from 'axios';
import gql from 'graphql-tag';
import { print } from 'graphql';
import { Event } from './types';

const listTransactions = gql`
  query ListTransactions ($walletID: ID!) {
    listTransactions(filter: {walletID: {eq: $walletID}}) {
      startedAt
      items {
        amount
      }
    }
  }
`;

export async function handler (event: Event) {
  const walletID = event.arguments.walletID;
  
  try {
    const result = await axios.post(
      process.env.API_LEARN3_GRAPHQLAPIENDPOINTOUTPUT,
      {
        query: print(listTransactions),
        variables: {
          walletID,
        },
      },
      {
        headers: {
          // 'x-api-key': process.env.API_LEARN3_GRAPHQLAPIIDOUTPUT,
          'authorization': event.request.headers.authorization,
        },
      }
    );

    const transactions = result.data.data.listTransactions.items;
    
    let sum = 0;

    for (const transaction of transactions) {
      sum += transaction.amount;
    }

    return sum;
  }
  catch (err) {
    console.log(err);
  }

  return Number.MIN_SAFE_INTEGER;
}