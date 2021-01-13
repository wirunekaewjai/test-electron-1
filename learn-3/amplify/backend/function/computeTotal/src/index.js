"use strict";
/* Amplify Params - DO NOT EDIT
    API_LEARN3_GRAPHQLAPIENDPOINTOUTPUT
    API_LEARN3_GRAPHQLAPIIDOUTPUT
    ENV
    REGION
Amplify Params - DO NOT EDIT */
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const axios_1 = require("axios");
const graphql_tag_1 = require("graphql-tag");
const graphql_1 = require("graphql");
const listTransactions = graphql_tag_1.default `
  query ListTransactions ($walletID: ID!) {
    listTransactions(filter: {walletID: {eq: $walletID}}) {
      startedAt
      items {
        amount
      }
    }
  }
`;
async function handler(event) {
    const walletID = event.arguments.walletID;
    try {
        const result = await axios_1.default.post(process.env.API_LEARN3_GRAPHQLAPIENDPOINTOUTPUT, {
            query: graphql_1.print(listTransactions),
            variables: {
                walletID,
            },
        }, {
            headers: {
                // 'x-api-key': process.env.API_LEARN3_GRAPHQLAPIIDOUTPUT,
                'authorization': event.request.headers.authorization,
            },
        });
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
exports.handler = handler;
