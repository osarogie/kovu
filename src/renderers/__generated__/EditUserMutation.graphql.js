/**
 * @flow
 * @relayHash 38ce8230bf4eed07952bf21bc79c0120
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type EditUser_viewer$ref = any;
export type EditUserMutationVariables = {|
  input: {
    clientMutationId?: ?string,
    name?: ?string,
    username?: ?string,
    email?: ?string,
    photo?: ?string,
    bio?: ?string,
  },
|};
export type EditUserMutationResponse = {|
  +editUser: ?{|
    +user: ?{|
      +$fragmentRefs: EditUser_viewer$ref,
    |},
    +success: ?boolean,
  |},
|};
*/


/*
mutation EditUserMutation(
  $input: EditUserInput!
) {
  editUser(input: $input) {
    user {
      ...EditUser_viewer
      id
    }
    success
  }
}

fragment EditUser_viewer on User {
  id
  _id
  name
  bio
  username
  profile_picture_name
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "EditUserInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input",
    "type": "EditUserInput!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "success",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "EditUserMutation",
  "id": null,
  "text": "mutation EditUserMutation(\n  $input: EditUserInput!\n) {\n  editUser(input: $input) {\n    user {\n      ...EditUser_viewer\n      id\n    }\n    success\n  }\n}\n\nfragment EditUser_viewer on User {\n  id\n  _id\n  name\n  bio\n  username\n  profile_picture_name\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "EditUserMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "editUser",
        "storageKey": null,
        "args": v1,
        "concreteType": "EditUserPayload",
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
                "name": "EditUser_viewer",
                "args": null
              }
            ]
          },
          v2
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "EditUserMutation",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "editUser",
        "storageKey": null,
        "args": v1,
        "concreteType": "EditUserPayload",
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
                "name": "id",
                "args": null,
                "storageKey": null
              },
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
                "name": "name",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "bio",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "username",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "profile_picture_name",
                "args": null,
                "storageKey": null
              }
            ]
          },
          v2
        ]
      }
    ]
  }
};
})();
(node/*: any*/).hash = '3af9692558502f94b05d61d42e7933f6';
module.exports = node;
