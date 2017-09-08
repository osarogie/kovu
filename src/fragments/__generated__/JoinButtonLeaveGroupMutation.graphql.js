/**
 * @flow
 * @relayHash 442431711206000858bf8934d755cf28
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type JoinButtonLeaveGroupMutationVariables = {|
  input: {
    clientMutationId?: ?string;
    id: string;
  };
|};

export type JoinButtonLeaveGroupMutationResponse = {|
  +leaveGroup: ?{|
    +group: ?{| |};
  |};
|};
*/


/*
mutation JoinButtonLeaveGroupMutation(
  $input: LeaveGroupInput!
) {
  leaveGroup(input: $input) {
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
        "type": "LeaveGroupInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "JoinButtonLeaveGroupMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "LeaveGroupInput!"
          }
        ],
        "concreteType": "LeaveGroupPayload",
        "name": "leaveGroup",
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
  "name": "JoinButtonLeaveGroupMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "LeaveGroupInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "JoinButtonLeaveGroupMutation",
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
            "type": "LeaveGroupInput!"
          }
        ],
        "concreteType": "LeaveGroupPayload",
        "name": "leaveGroup",
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
  "text": "mutation JoinButtonLeaveGroupMutation(\n  $input: LeaveGroupInput!\n) {\n  leaveGroup(input: $input) {\n    group {\n      ...JoinButton_group\n      id\n    }\n  }\n}\n\nfragment JoinButton_group on Group {\n  _id\n  viewer_is_a_member\n  is_private\n}\n"
};

module.exports = batch;
