/**
 * @flow
 * @relayHash 5f9e8f14c6eb51abdc28d3392c3fea37
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type EditUser_viewer$ref = any;
export type EditUserQueryVariables = {| |};
export type EditUserQueryResponse = {|
  +viewer: ?{|
    +$fragmentRefs: EditUser_viewer$ref,
  |},
|};
*/


/*
query EditUserQuery {
  viewer {
    ...EditUser_viewer
    id
  }
}

fragment EditUser_viewer on User {
  id
  _id
  name
  bio
  username
  profile_picture_name
}
*/

const node/*: ConcreteRequest*/ = {
  "kind": "Request",
  "operationKind": "query",
  "name": "EditUserQuery",
  "id": null,
  "text": "query EditUserQuery {\n  viewer {\n    ...EditUser_viewer\n    id\n  }\n}\n\nfragment EditUser_viewer on User {\n  id\n  _id\n  name\n  bio\n  username\n  profile_picture_name\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "EditUserQuery",
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
            "name": "EditUser_viewer",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "EditUserQuery",
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
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "name",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "bio",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "username",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "profile_picture_name",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
};
(node/*: any*/).hash = '9944f13cc203e55db47b1cb5faf1790c';
module.exports = node;
