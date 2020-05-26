/**
 * @flow
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
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ChangePasswordQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ChangePassword_viewer"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ChangePasswordQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "_id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "ChangePasswordQuery",
    "operationKind": "query",
    "text": "query ChangePasswordQuery {\n  viewer {\n    ...ChangePassword_viewer\n    id\n  }\n}\n\nfragment ChangePassword_viewer on User {\n  id\n  _id\n}\n"
  }
};
// prettier-ignore
(node/*: any*/).hash = 'a905aa8136c9811c2f003a4e74d4f9ff';

module.exports = node;
