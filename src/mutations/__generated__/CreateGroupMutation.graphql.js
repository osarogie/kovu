/**
 * @flow
 * @relayHash 257d75a9cba0263fa3a0328efe4070d9
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type GroupListItem_group$ref = any;
export type CreateGroupMutationVariables = {|
  input: {
    clientMutationId?: ?string,
    name: string,
    body?: ?string,
    is_private?: ?boolean,
    header_image?: ?string,
  },
|};
export type CreateGroupMutationResponse = {|
  +createGroup: ?{|
    +success: ?boolean,
    +group: ?{|
      +$fragmentRefs: GroupListItem_group$ref,
    |},
  |},
|};
*/


/*
mutation CreateGroupMutation(
  $input: CreateGroupInput!
) {
  createGroup(input: $input) {
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
    "type": "CreateGroupInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input",
    "type": "CreateGroupInput!"
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
  "name": "CreateGroupMutation",
  "id": null,
  "text": "mutation CreateGroupMutation(\n  $input: CreateGroupInput!\n) {\n  createGroup(input: $input) {\n    success\n    group {\n      ...GroupListItem_group\n      id\n    }\n  }\n}\n\nfragment GroupListItem_group on Group {\n  id\n  _id\n  name\n  permalink\n  body\n  header_image {\n    name\n    id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "CreateGroupMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createGroup",
        "storageKey": null,
        "args": v1,
        "concreteType": "CreateGroupPayload",
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
    "name": "CreateGroupMutation",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createGroup",
        "storageKey": null,
        "args": v1,
        "concreteType": "CreateGroupPayload",
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
(node/*: any*/).hash = 'c6b3b4f376e689aa5c2c8a9e026db017';
module.exports = node;
