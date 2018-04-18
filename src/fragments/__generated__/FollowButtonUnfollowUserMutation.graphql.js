/**
 * @flow
 * @relayHash 366dc571fe9e89a404b6be313ffbd61e
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type FollowButton_user$ref = any;
export type FollowButtonUnfollowUserMutationVariables = {|
  input: {
    clientMutationId?: ?string,
    id: string,
  },
|};
export type FollowButtonUnfollowUserMutationResponse = {|
  +unfollowUser: ?{|
    +user: ?{|
      +$fragmentRefs: FollowButton_user$ref,
    |},
  |},
|};
*/


/*
mutation FollowButtonUnfollowUserMutation(
  $input: UnfollowUserInput!
) {
  unfollowUser(input: $input) {
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
    "type": "UnfollowUserInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input",
    "type": "UnfollowUserInput!"
  }
];
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "FollowButtonUnfollowUserMutation",
  "id": null,
  "text": "mutation FollowButtonUnfollowUserMutation(\n  $input: UnfollowUserInput!\n) {\n  unfollowUser(input: $input) {\n    user {\n      ...FollowButton_user\n      id\n    }\n  }\n}\n\nfragment FollowButton_user on User {\n  _id\n  viewer_follows\n  follows_viewer\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "FollowButtonUnfollowUserMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "unfollowUser",
        "storageKey": null,
        "args": v1,
        "concreteType": "UnfollowUserPayload",
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
    "name": "FollowButtonUnfollowUserMutation",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "unfollowUser",
        "storageKey": null,
        "args": v1,
        "concreteType": "UnfollowUserPayload",
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
(node/*: any*/).hash = '3c6c2aec1c72980d864f8ddb41b64650';
module.exports = node;
