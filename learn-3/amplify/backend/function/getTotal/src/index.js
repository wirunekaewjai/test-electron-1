/* Amplify Params - DO NOT EDIT
    API_LEARN3_GRAPHQLAPIENDPOINTOUTPUT
    API_LEARN3_GRAPHQLAPIIDOUTPUT
    API_LEARN3_TRANSACTIONTABLE_ARN
    API_LEARN3_TRANSACTIONTABLE_NAME
    API_LEARN3_WALLETTABLE_ARN
    API_LEARN3_WALLETTABLE_NAME
    AUTH_LEARN398D2F25F_USERPOOLID
    ENV
    REGION
Amplify Params - DO NOT EDIT */
// const axios = require('axios');
// const gql = require('graphql-tag');
// const graphql = require('graphql');

// const listTransactions = gql`
//   query listTransactions {
//     listTransactions {
//       items {
//         amount
//       }
//     }
//   }
// `

exports.handler = async (event) =>
{
  console.log(JSON.stringify(event, null, 2));
  console.log(JSON.stringify(process.env, null, 2));
  // try {
  //   const graphqlData = await axios({
  //     url: process.env.API_LEARN3_GRAPHQLAPIENDPOINTOUTPUT,
  //     method: 'post',
  //     headers: {
  //       'x-api-key': process.env.API_LEARN3_GRAPHQLAPIIDOUTPUT
  //     },
  //     data: {
  //       query: print(listTransactions),
  //     }
  //   });
  //   const body = {
  //     graphqlData: graphqlData.data.data.listTodos
  //   }

  //   return {
  //     statusCode: 200,
  //     body: JSON.stringify(body),
  //     headers: {
  //       "Access-Control-Allow-Origin": "*",
  //     }
  //   }
  // } 
  // catch (err) {
  //   console.log('error posting to appsync: ', err);
  // }

  // TODO implement
  // const response = {
  //     statusCode: 200,
  // //  Uncomment below to enable CORS requests
  // //  headers: {
  // //      "Access-Control-Allow-Origin": "*",
  // //      "Access-Control-Allow-Headers": "*"
  // //  }, 
  //     body: JSON.stringify('Hello from Lambda!'),
  // };
  return 12345;
};
