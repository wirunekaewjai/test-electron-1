/* Amplify Params - DO NOT EDIT
    API_LEARN1_ENTRYTABLE_ARN
    API_LEARN1_ENTRYTABLE_NAME
    API_LEARN1_GRAPHQLAPIIDOUTPUT
    API_LEARN1_NOTETABLE_ARN
    API_LEARN1_NOTETABLE_NAME
    AUTH_LEARN1DA44E1CF_USERPOOLID
    ENV
    REGION
Amplify Params - DO NOT EDIT */

exports.handler = async (event) =>
{
    console.log(JSON.stringify(event, null, 2));

    return {
        nextToken: '12345',
        items: [
            {
                id: '1',
                name: 'eiei',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            }
        ],
    };
};
