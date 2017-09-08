/**
 * @flow
 * @relayHash 3b61dc44c363a06c9795bf2a3cb596ad
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type ChangePasswordQueryResponse = {|
  +viewer: ?{| |};
|};
*/


/*
query ChangePasswordQuery {
  viewer {
    ...ChangePassword_viewer
    id
  }
}

fragment ChangePassword_viewer on User {
  id
  _id
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ChangePasswordQuery",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "User",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ChangePassword_viewer",
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
  "name": "ChangePasswordQuery",
  "query": {
    "argumentDefinitions": [],
    "kind": "Root",
    "name": "ChangePasswordQuery",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "User",
        "name": "viewer",
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
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query ChangePasswordQuery {\n  viewer {\n    ...ChangePassword_viewer\n    id\n  }\n}\n\nfragment ChangePassword_viewer on User {\n  id\n  _id\n}\n"
};

module.exports = batch;
