/**
 * @flow
 * @relayHash 13d9d1e2d67e5c922e12ef9e55a2955a
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type ChangePassword_viewer$ref = any;
export type ChangePasswordQueryVariables = {||};
export type ChangePasswordQueryResponse = {|
  +viewer: ?{|
    +$fragmentRefs: ChangePassword_viewer$ref
  |}
|};
export type ChangePasswordQuery = {|
  variables: ChangePasswordQueryVariables,
  response: ChangePasswordQueryResponse,
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

const node/*: ConcreteRequest*/ = {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ChangePasswordQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ChangePassword_viewer",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ChangePasswordQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "_id",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "ChangePasswordQuery",
    "id": null,
    "text": "query ChangePasswordQuery {\n  viewer {\n    ...ChangePassword_viewer\n    id\n  }\n}\n\nfragment ChangePassword_viewer on User {\n  id\n  _id\n}\n",
    "metadata": {}
  }
};
// prettier-ignore
(node/*: any*/).hash = 'a905aa8136c9811c2f003a4e74d4f9ff';
module.exports = node;
