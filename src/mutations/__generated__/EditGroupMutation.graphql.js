/**
 * @flow
 * @relayHash c9abe71bd5767d1ad9b1ad550be96163
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type GroupListItem_group$ref = any;
export type EditGroupMutationVariables = {|
  input: {
    clientMutationId?: ?string,
    id: string,
    name: string,
    body?: ?string,
    is_private?: ?boolean,
    header_image?: ?string,
  },
|};
export type EditGroupMutationResponse = {|
  +editGroup: ?{|
    +success: ?boolean,
    +group: ?{|
      +$fragmentRefs: GroupListItem_group$ref,
    |},
  |},
|};
*/


/*
mutation EditGroupMutation(
  $input: EditGroupInput!
) {
  editGroup(input: $input) {
    success
    group {
      ...GroupListItem_group
      id
    }
  }
}

fragment GroupListItem_group on Group {
  id
  _id
  name
  permalink
  body
  header_image {
    name
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "EditGroupInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input",
    "type": "EditGroupInput!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "success",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "EditGroupMutation",
  "id": null,
  "text": "mutation EditGroupMutation(\n  $input: EditGroupInput!\n) {\n  editGroup(input: $input) {\n    success\n    group {\n      ...GroupListItem_group\n      id\n    }\n  }\n}\n\nfragment GroupListItem_group on Group {\n  id\n  _id\n  name\n  permalink\n  body\n  header_image {\n    name\n    id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "EditGroupMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "editGroup",
        "storageKey": null,
        "args": v1,
        "concreteType": "EditGroupPayload",
        "plural": false,
        "selections": [
          v2,
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
                "name": "GroupListItem_group",
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
    "name": "EditGroupMutation",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "editGroup",
        "storageKey": null,
        "args": v1,
        "concreteType": "EditGroupPayload",
        "plural": false,
        "selections": [
          v2,
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "group",
            "storageKey": null,
            "args": null,
            "concreteType": "Group",
            "plural": false,
            "selections": [
              v3,
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "_id",
                "args": null,
                "storageKey": null
              },
              v4,
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "permalink",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "body",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "header_image",
                "storageKey": null,
                "args": null,
                "concreteType": "Photo",
                "plural": false,
                "selections": [
                  v4,
                  v3
                ]
              }
            ]
          }
        ]
      }
    ]
  }
};
})();
(node/*: any*/).hash = '66b0e034d2d3a6cbb3b17c9a7b590f27';
module.exports = node;
