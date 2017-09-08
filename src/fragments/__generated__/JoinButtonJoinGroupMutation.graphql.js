/**
 * @flow
 * @relayHash fa8837b16d8a65b14320ceda6a4a857f
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type JoinButtonJoinGroupMutationVariables = {|
  input: {
    clientMutationId?: ?string;
    id: string;
  };
|};

export type JoinButtonJoinGroupMutationResponse = {|
  +joinGroup: ?{|
    +group: ?{| |};
  |};
|};
*/


/*
mutation JoinButtonJoinGroupMutation(
  $input: JoinGroupInput!
) {
  joinGroup(input: $input) {
    group {
      ...JoinButton_group
      id
    }
  }
}

fragment JoinButton_group on Group {
  _id
  viewer_is_a_member
  is_private
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "JoinGroupInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "JoinButtonJoinGroupMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "JoinGroupInput!"
          }
        ],
        "concreteType": "JoinGroupPayload",
        "name": "joinGroup",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Group",
            "name": "group",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "JoinButton_group",
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
  "name": "JoinButtonJoinGroupMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "JoinGroupInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "JoinButtonJoinGroupMutation",
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
            "type": "JoinGroupInput!"
          }
        ],
        "concreteType": "JoinGroupPayload",
        "name": "joinGroup",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Group",
            "name": "group",
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
                "name": "viewer_is_a_member",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "is_private",
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
  "text": "mutation JoinButtonJoinGroupMutation(\n  $input: JoinGroupInput!\n) {\n  joinGroup(input: $input) {\n    group {\n      ...JoinButton_group\n      id\n    }\n  }\n}\n\nfragment JoinButton_group on Group {\n  _id\n  viewer_is_a_member\n  is_private\n}\n"
};

module.exports = batch;
