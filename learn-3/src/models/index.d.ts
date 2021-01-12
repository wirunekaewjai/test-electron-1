import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Wallet {
  readonly id: string;
  readonly name: string;
  readonly transactions?: (Transaction | null)[];
  readonly createdAt: string;
  readonly updatedAt: string;
  constructor(init: ModelInit<Wallet>);
  static copyOf(source: Wallet, mutator: (draft: MutableModel<Wallet>) => MutableModel<Wallet> | void): Wallet;
}

export declare class Transaction {
  readonly id: string;
  readonly amount: number;
  readonly message?: string;
  readonly walletID: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  constructor(init: ModelInit<Transaction>);
  static copyOf(source: Transaction, mutator: (draft: MutableModel<Transaction>) => MutableModel<Transaction> | void): Transaction;
}