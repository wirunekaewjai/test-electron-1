import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Entry {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  constructor(init: ModelInit<Entry>);
  static copyOf(source: Entry, mutator: (draft: MutableModel<Entry>) => MutableModel<Entry> | void): Entry;
}