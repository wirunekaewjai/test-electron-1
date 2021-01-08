/* Amplify Params - DO NOT EDIT
	API_LEARN1_GRAPHQLAPIIDOUTPUT
	API_LEARN1_ITEMTABLE_ARN
	API_LEARN1_ITEMTABLE_NAME
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