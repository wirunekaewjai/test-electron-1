// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const AttributeTypes = {
  "BINARY": "binary",
  "BINARY_SET": "binarySet",
  "BOOL": "bool",
  "LIST": "list",
  "MAP": "map",
  "NUMBER": "number",
  "NUMBER_SET": "numberSet",
  "STRING": "string",
  "STRING_SET": "stringSet",
  "NULL": "_null"
};

const { Note, Entry, NoteConnection } = initSchema(schema);

export {
  Note,
  Entry,
  AttributeTypes,
  NoteConnection
};