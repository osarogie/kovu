/**
 * @flow
 * @relayHash 96039d50b6718c23622ede7df71a2309
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ChangePasswordScreenMutationVariables = {|
  input: {
    clientMutationId?: ?string,
    current_password: string,
    new_password: string,
    new_password_confirmation?: ?string,
  },
|};
export type ChangePasswordScreenMutationResponse = {|
  +changePassword: ?{|
    +success: ?boolean,
  |},
|};
*/


/*
mutation ChangePasswordScreenMutation(
  $input: ChangePasswordInput!
) {
  changePassword(input: $input) {
    success
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "ChangePasswordInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "changePassword",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input",
        "type": "ChangePasswordInput!"
      }
    ],
    "concreteType": "ChangePasswordPayload",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "success",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "ChangePasswordScreenMutation",
  "id": null,
  "text": "mutation ChangePasswordScreenMutation(\n  $input: ChangePasswordInput!\n) {\n  changePassword(input: $input) {\n    success\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "ChangePasswordScreenMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "ChangePasswordScreenMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
(node/*: any*/).hash = '4648e9042b5367f26a73cc83a596b469';
module.exports = node;
