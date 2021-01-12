/* Amplify Params - DO NOT EDIT
  API_LEARN3_GRAPHQLAPIENDPOINTOUTPUT
  API_LEARN3_GRAPHQLAPIIDOUTPUT
  ENV
  REGION
Amplify Params - DO NOT EDIT */
const axios = require('axios');
const gql = require('graphql-tag');
const graphql = require('graphql');
const { print } = graphql;

// const total = gql`
//   query Total($walletID: ID!) {
//     total(walletID: $walletID)
//   }
// `;
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

exports.handler = async (event) =>
{
  // console.log(JSON.stringify(event, null, 2));
  // console.log(JSON.stringify(process.env, null, 2));

  // return 1234;

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
};
