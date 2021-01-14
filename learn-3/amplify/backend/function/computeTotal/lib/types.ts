
export interface Event {
  arguments: {
    walletID: string;
  };

  identity: {
    issuer: string;
    username: string;
  },

  request: {
    headers: {
      authorization: string;
    };
  };
}

export interface Env extends NodeJS.ProcessEnv {
  API_LEARN3_GRAPHQLAPIENDPOINTOUTPUT: string;
	API_LEARN3_GRAPHQLAPIIDOUTPUT: string;
	ENV: string;
	REGION: string;
}