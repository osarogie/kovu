/**
 * @flow
 * @relayHash 2cdaee133f3b06d534060d767d7f01b5
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type JoinButton_group$ref = any;
export type JoinButtonJoinGroupMutationVariables = {|
  input: {
    clientMutationId?: ?string,
    id: string,
  },
|};
export type JoinButtonJoinGroupMutationResponse = {|
  +joinGroup: ?{|
    +group: ?{|
      +$fragmentRefs: JoinButton_group$ref,
    |},
  |},
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

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "JoinGroupInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input",
    "type": "JoinGroupInput!"
  }
];
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "JoinButtonJoinGroupMutation",
  "id": null,
  "text": "mutation JoinButtonJoinGroupMutation(\n  $input: JoinGroupInput!\n) {\n  joinGroup(input: $input) {\n    group {\n      ...JoinButton_group\n      id\n    }\n  }\n}\n\nfragment JoinButton_group on Group {\n  _id\n  viewer_is_a_member\n  is_private\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "JoinButtonJoinGroupMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "joinGroup",
        "storageKey": null,
        "args": v1,
        "concreteType": "JoinGroupPayload",
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
    "name": "JoinButtonJoinGroupMutation",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "joinGroup",
        "storageKey": null,
        "args": v1,
        "concreteType": "JoinGroupPayload",
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
(node/*: any*/).hash = '06dd10ef3dfec09b6ee3949fba2a8058';
module.exports = node;
