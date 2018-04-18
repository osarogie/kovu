/**
 * @flow
 * @relayHash 1dc8fe8697aa94b6e47a222e698d2af4
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type JoinButton_group$ref = any;
export type JoinButtonLeaveGroupMutationVariables = {|
  input: {
    clientMutationId?: ?string,
    id: string,
  },
|};
export type JoinButtonLeaveGroupMutationResponse = {|
  +leaveGroup: ?{|
    +group: ?{|
      +$fragmentRefs: JoinButton_group$ref,
    |},
  |},
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

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "LeaveGroupInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input",
    "type": "LeaveGroupInput!"
  }
];
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "JoinButtonLeaveGroupMutation",
  "id": null,
  "text": "mutation JoinButtonLeaveGroupMutation(\n  $input: LeaveGroupInput!\n) {\n  leaveGroup(input: $input) {\n    group {\n      ...JoinButton_group\n      id\n    }\n  }\n}\n\nfragment JoinButton_group on Group {\n  _id\n  viewer_is_a_member\n  is_private\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "JoinButtonLeaveGroupMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "leaveGroup",
        "storageKey": null,
        "args": v1,
        "concreteType": "LeaveGroupPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "group",
            "storageKey": null,
            "args": null,
            "concreteType": "Group",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "JoinButton_group",
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
    "name": "JoinButtonLeaveGroupMutation",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "leaveGroup",
        "storageKey": null,
        "args": v1,
        "concreteType": "LeaveGroupPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "group",
            "storageKey": null,
            "args": null,
            "concreteType": "Group",
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
                "name": "viewer_is_a_member",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "is_private",
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
(node/*: any*/).hash = '9137dafaf683b0f4df4d9964b55365ba';
module.exports = node;
