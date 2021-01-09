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
        items: [
            {
                entryID: 'ec60fcf5-073b-45e0-a9a0-2657888d530d',
                id: '1',
                message: 'eiei',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            }
        ],
    };
};
