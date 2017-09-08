/**
 * @flow
 * @relayHash d7a913b2056c66ee54bd5dd96454a453
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type FollowButtonFollowUserMutationVariables = {|
  input: {
    clientMutationId?: ?string;
    id: string;
  };
|};

export type FollowButtonFollowUserMutationResponse = {|
  +followUser: ?{|
    +user: ?{| |};
  |};
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

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "FollowUserInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "FollowButtonFollowUserMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "FollowUserInput!"
          }
        ],
        "concreteType": "FollowUserPayload",
        "name": "followUser",
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
  "name": "FollowButtonFollowUserMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "FollowUserInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "FollowButtonFollowUserMutation",
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
            "type": "FollowUserInput!"
          }
        ],
        "concreteType": "FollowUserPayload",
        "name": "followUser",
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
  "text": "mutation FollowButtonFollowUserMutation(\n  $input: FollowUserInput!\n) {\n  followUser(input: $input) {\n    user {\n      ...FollowButton_user\n      id\n    }\n  }\n}\n\nfragment FollowButton_user on User {\n  _id\n  viewer_follows\n  follows_viewer\n}\n"
};

module.exports = batch;
