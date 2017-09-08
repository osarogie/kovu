/**
 * @flow
 * @relayHash 0e3d3abcaa8ecf0584d36ab026de03a4
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type EditorQueryResponse = {|
  +discussion: ?{| |};
|};
*/


/*
query EditorQuery(
  $id: ID!
) {
  discussion(id: $id) {
    ...Editor_discussion
    id
  }
}

fragment Editor_discussion on Discussion {
  id
  _id
  name
  body
  parsed_body
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "id",
        "type": "ID!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "EditorQuery",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "id",
            "type": "ID!"
          }
        ],
        "concreteType": "Discussion",
        "name": "discussion",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "Editor_discussion",
            "args": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "EditorQuery",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "id",
        "type": "ID!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "EditorQuery",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "id",
            "type": "ID!"
          }
        ],
        "concreteType": "Discussion",
        "name": "discussion",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "id",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "_id",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "name",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "body",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "parsed_body",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query EditorQuery(\n  $id: ID!\n) {\n  discussion(id: $id) {\n    ...Editor_discussion\n    id\n  }\n}\n\nfragment Editor_discussion on Discussion {\n  id\n  _id\n  name\n  body\n  parsed_body\n}\n"
};

module.exports = batch;
