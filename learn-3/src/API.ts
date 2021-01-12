/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateTransactionInput = {
  id?: string | null,
  message: string,
  amount: number,
  createdAt?: string | null,
  updatedAt?: string | null,
  walletID: string,
  _version?: number | null,
};

export type ModelTransactionConditionInput = {
  message?: ModelStringInput | null,
  amount?: ModelFloatInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  walletID?: ModelIDInput | null,
  and?: Array< ModelTransactionConditionInput | null > | null,
  or?: Array< ModelTransactionConditionInput | null > | null,
  not?: ModelTransactionConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateTransactionInput = {
  id: string,
  message?: string | null,
  amount?: number | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  walletID?: string | null,
  _version?: number | null,
};

export type DeleteTransactionInput = {
  id?: string | null,
  _version?: number | null,
};

export type CreateWalletInput = {
  id?: string | null,
  name: string,
  createdAt?: string | null,
  updatedAt?: string | null,
  _version?: number | null,
};

export type ModelWalletConditionInput = {
  name?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelWalletConditionInput | null > | null,
  or?: Array< ModelWalletConditionInput | null > | null,
  not?: ModelWalletConditionInput | null,
};

export type UpdateWalletInput = {
  id: string,
  name?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  _version?: number | null,
};

export type DeleteWalletInput = {
  id?: string | null,
  _version?: number | null,
};

export type ModelTransactionFilterInput = {
  id?: ModelIDInput | null,
  message?: ModelStringInput | null,
  amount?: ModelFloatInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  walletID?: ModelIDInput | null,
  and?: Array< ModelTransactionFilterInput | null > | null,
  or?: Array< ModelTransactionFilterInput | null > | null,
  not?: ModelTransactionFilterInput | null,
};

export type ModelWalletFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelWalletFilterInput | null > | null,
  or?: Array< ModelWalletFilterInput | null > | null,
  not?: ModelWalletFilterInput | null,
};

export type CreateTransactionMutationVariables = {
  input: CreateTransactionInput,
  condition?: ModelTransactionConditionInput | null,
};

export type CreateTransactionMutation = {
  createTransaction:  {
    __typename: "Transaction",
    id: string,
    message: string,
    amount: number,
    createdAt: string | null,
    updatedAt: string | null,
    walletID: string,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    owner: string | null,
  } | null,
};

export type UpdateTransactionMutationVariables = {
  input: UpdateTransactionInput,
  condition?: ModelTransactionConditionInput | null,
};

export type UpdateTransactionMutation = {
  updateTransaction:  {
    __typename: "Transaction",
    id: string,
    message: string,
    amount: number,
    createdAt: string | null,
    updatedAt: string | null,
    walletID: string,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    owner: string | null,
  } | null,
};

export type DeleteTransactionMutationVariables = {
  input: DeleteTransactionInput,
  condition?: ModelTransactionConditionInput | null,
};

export type DeleteTransactionMutation = {
  deleteTransaction:  {
    __typename: "Transaction",
    id: string,
    message: string,
    amount: number,
    createdAt: string | null,
    updatedAt: string | null,
    walletID: string,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    owner: string | null,
  } | null,
};

export type CreateWalletMutationVariables = {
  input: CreateWalletInput,
  condition?: ModelWalletConditionInput | null,
};

export type CreateWalletMutation = {
  createWallet:  {
    __typename: "Wallet",
    id: string,
    name: string,
    createdAt: string | null,
    updatedAt: string | null,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    owner: string | null,
  } | null,
};

export type UpdateWalletMutationVariables = {
  input: UpdateWalletInput,
  condition?: ModelWalletConditionInput | null,
};

export type UpdateWalletMutation = {
  updateWallet:  {
    __typename: "Wallet",
    id: string,
    name: string,
    createdAt: string | null,
    updatedAt: string | null,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    owner: string | null,
  } | null,
};

export type DeleteWalletMutationVariables = {
  input: DeleteWalletInput,
  condition?: ModelWalletConditionInput | null,
};

export type DeleteWalletMutation = {
  deleteWallet:  {
    __typename: "Wallet",
    id: string,
    name: string,
    createdAt: string | null,
    updatedAt: string | null,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    owner: string | null,
  } | null,
};

export type TotalQueryVariables = {
  walletID: string,
};

export type TotalQuery = {
  total: number,
};

export type GetTransactionQueryVariables = {
  id: string,
};

export type GetTransactionQuery = {
  getTransaction:  {
    __typename: "Transaction",
    id: string,
    message: string,
    amount: number,
    createdAt: string | null,
    updatedAt: string | null,
    walletID: string,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    owner: string | null,
  } | null,
};

export type ListTransactionsQueryVariables = {
  filter?: ModelTransactionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTransactionsQuery = {
  listTransactions:  {
    __typename: "ModelTransactionConnection",
    items:  Array< {
      __typename: "Transaction",
      id: string,
      message: string,
      amount: number,
      createdAt: string | null,
      updatedAt: string | null,
      walletID: string,
      _version: number,
      _deleted: boolean | null,
      _lastChangedAt: number,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
    startedAt: number | null,
  } | null,
};

export type SyncTransactionsQueryVariables = {
  filter?: ModelTransactionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncTransactionsQuery = {
  syncTransactions:  {
    __typename: "ModelTransactionConnection",
    items:  Array< {
      __typename: "Transaction",
      id: string,
      message: string,
      amount: number,
      createdAt: string | null,
      updatedAt: string | null,
      walletID: string,
      _version: number,
      _deleted: boolean | null,
      _lastChangedAt: number,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
    startedAt: number | null,
  } | null,
};

export type GetWalletQueryVariables = {
  id: string,
};

export type GetWalletQuery = {
  getWallet:  {
    __typename: "Wallet",
    id: string,
    name: string,
    createdAt: string | null,
    updatedAt: string | null,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    owner: string | null,
  } | null,
};

export type ListWalletsQueryVariables = {
  filter?: ModelWalletFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListWalletsQuery = {
  listWallets:  {
    __typename: "ModelWalletConnection",
    items:  Array< {
      __typename: "Wallet",
      id: string,
      name: string,
      createdAt: string | null,
      updatedAt: string | null,
      _version: number,
      _deleted: boolean | null,
      _lastChangedAt: number,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
    startedAt: number | null,
  } | null,
};

export type SyncWalletsQueryVariables = {
  filter?: ModelWalletFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncWalletsQuery = {
  syncWallets:  {
    __typename: "ModelWalletConnection",
    items:  Array< {
      __typename: "Wallet",
      id: string,
      name: string,
      createdAt: string | null,
      updatedAt: string | null,
      _version: number,
      _deleted: boolean | null,
      _lastChangedAt: number,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
    startedAt: number | null,
  } | null,
};

export type OnCreateTransactionSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateTransactionSubscription = {
  onCreateTransaction:  {
    __typename: "Transaction",
    id: string,
    message: string,
    amount: number,
    createdAt: string | null,
    updatedAt: string | null,
    walletID: string,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    owner: string | null,
  } | null,
};

export type OnUpdateTransactionSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateTransactionSubscription = {
  onUpdateTransaction:  {
    __typename: "Transaction",
    id: string,
    message: string,
    amount: number,
    createdAt: string | null,
    updatedAt: string | null,
    walletID: string,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    owner: string | null,
  } | null,
};

export type OnDeleteTransactionSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteTransactionSubscription = {
  onDeleteTransaction:  {
    __typename: "Transaction",
    id: string,
    message: string,
    amount: number,
    createdAt: string | null,
    updatedAt: string | null,
    walletID: string,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    owner: string | null,
  } | null,
};

export type OnCreateWalletSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateWalletSubscription = {
  onCreateWallet:  {
    __typename: "Wallet",
    id: string,
    name: string,
    createdAt: string | null,
    updatedAt: string | null,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    owner: string | null,
  } | null,
};

export type OnUpdateWalletSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateWalletSubscription = {
  onUpdateWallet:  {
    __typename: "Wallet",
    id: string,
    name: string,
    createdAt: string | null,
    updatedAt: string | null,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    owner: string | null,
  } | null,
};

export type OnDeleteWalletSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteWalletSubscription = {
  onDeleteWallet:  {
    __typename: "Wallet",
    id: string,
    name: string,
    createdAt: string | null,
    updatedAt: string | null,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    owner: string | null,
  } | null,
};
