/**
 * @flow
 * @relayHash 34b1527032266bfe9e92e8a84ec70a6b
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type FollowButtonUnfollowUserMutationVariables = {|
  input: {
    clientMutationId?: ?string;
    id: string;
  };
|};

export type FollowButtonUnfollowUserMutationResponse = {|
  +unfollowUser: ?{|
    +user: ?{| |};
  |};
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

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "UnfollowUserInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "FollowButtonUnfollowUserMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "UnfollowUserInput!"
          }
        ],
        "concreteType": "UnfollowUserPayload",
        "name": "unfollowUser",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "User",
            "name": "user",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "FollowButton_user",
                "args": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "FollowButtonUnfollowUserMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "UnfollowUserInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "FollowButtonUnfollowUserMutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "UnfollowUserInput!"
          }
        ],
        "concreteType": "UnfollowUserPayload",
        "name": "unfollowUser",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "User",
            "name": "user",
            "plural": false,
            "selections": [
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
                "name": "viewer_follows",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "follows_viewer",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation FollowButtonUnfollowUserMutation(\n  $input: UnfollowUserInput!\n) {\n  unfollowUser(input: $input) {\n    user {\n      ...FollowButton_user\n      id\n    }\n  }\n}\n\nfragment FollowButton_user on User {\n  _id\n  viewer_follows\n  follows_viewer\n}\n"
};

module.exports = batch;
