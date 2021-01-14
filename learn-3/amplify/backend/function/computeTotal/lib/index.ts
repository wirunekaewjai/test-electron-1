/* Amplify Params - DO NOT EDIT
	API_LEARN3_GRAPHQLAPIENDPOINTOUTPUT
	API_LEARN3_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import {
  axios,
  gql,
  print,

  Event, Env,
} from './bundle';

const listTransactions = gql`
  query ListTransactions ($walletID: ID!) {
    listTransactions(filter: {walletID: {eq: $walletID}}) {
      items {
        amount
      }
    }
  }
`;

export async function handler (event: Event, context: any) {
  try {
    console.log(JSON.stringify(context, null, 2));
  }
  catch (err) {
    console.log(err);
  }

  console.log(JSON.stringify(event, null, 2));
  console.log(JSON.stringify(process.env, null, 2));

  const walletID = event.arguments.walletID;
  const env = process.env as Env;
  
  try {
    const result = await axios.post(
      env.API_LEARN3_GRAPHQLAPIENDPOINTOUTPUT,
      {
        query: print(listTransactions),
        variables: {
          walletID,
        },  
      },
      {
        headers: {
          // 'x-api-key': env.API_LEARN3_GRAPHQLAPIIDOUTPUT,
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