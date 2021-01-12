/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTransaction = /* GraphQL */ `
  subscription OnCreateTransaction($owner: String) {
    onCreateTransaction(owner: $owner) {
      id
      message
      amount
      createdAt
      updatedAt
      walletID
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onUpdateTransaction = /* GraphQL */ `
  subscription OnUpdateTransaction($owner: String) {
    onUpdateTransaction(owner: $owner) {
      id
      message
      amount
      createdAt
      updatedAt
      walletID
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onDeleteTransaction = /* GraphQL */ `
  subscription OnDeleteTransaction($owner: String) {
    onDeleteTransaction(owner: $owner) {
      id
      message
      amount
      createdAt
      updatedAt
      walletID
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onCreateWallet = /* GraphQL */ `
  subscription OnCreateWallet($owner: String) {
    onCreateWallet(owner: $owner) {
      id
      name
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onUpdateWallet = /* GraphQL */ `
  subscription OnUpdateWallet($owner: String) {
    onUpdateWallet(owner: $owner) {
      id
      name
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onDeleteWallet = /* GraphQL */ `
  subscription OnDeleteWallet($owner: String) {
    onDeleteWallet(owner: $owner) {
      id
      name
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
