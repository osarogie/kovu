/**
 * @flow
 * @relayHash 2f0d5a0fe074b6dbc5c7e05a2082c028
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type FollowButton_user$ref = any;
export type FollowButtonFollowUserMutationVariables = {|
  input: {
    clientMutationId?: ?string,
    id: string,
  },
|};
export type FollowButtonFollowUserMutationResponse = {|
  +followUser: ?{|
    +user: ?{|
      +$fragmentRefs: FollowButton_user$ref,
    |},
  |},
|};
*/


/*
mutation FollowButtonFollowUserMutation(
  $input: FollowUserInput!
) {
  followUser(input: $input) {
    user {
      ...FollowButton_user
      id
    }
  }
}

fragment FollowButton_user on User {
  _id
  viewer_follows
  follows_viewer
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "FollowUserInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input",
    "type": "FollowUserInput!"
  }
];
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "FollowButtonFollowUserMutation",
  "id": null,
  "text": "mutation FollowButtonFollowUserMutation(\n  $input: FollowUserInput!\n) {\n  followUser(input: $input) {\n    user {\n      ...FollowButton_user\n      id\n    }\n  }\n}\n\nfragment FollowButton_user on User {\n  _id\n  viewer_follows\n  follows_viewer\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "FollowButtonFollowUserMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "followUser",
        "storageKey": null,
        "args": v1,
        "concreteType": "FollowUserPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "user",
            "storageKey": null,
            "args": null,
            "concreteType": "User",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "FollowButton_user",
                "args": null
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "FollowButtonFollowUserMutation",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "followUser",
        "storageKey": null,
        "args": v1,
        "concreteType": "FollowUserPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "user",
            "storageKey": null,
            "args": null,
            "concreteType": "User",
            "plural": false,
            "selections": [
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
                "name": "viewer_follows",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "follows_viewer",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "id",
                "args": null,
                "storageKey": null
              }
            ]
          }
        ]
      }
    ]
  }
};
})();
(node/*: any*/).hash = 'ba0002ae30c4a3eea5bc71b7ef9658c8';
module.exports = node;
