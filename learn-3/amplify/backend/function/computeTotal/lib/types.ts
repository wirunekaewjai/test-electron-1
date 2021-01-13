
export interface Event {
  arguments: {
    walletID: string;
  };

  request: {
    headers: {
      authorization: string;
    };
  };
}