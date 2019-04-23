/**
 * @flow
 * @relayHash 9eb900c41e7cd0be0a8f44e061683e36
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ChangePasswordInput = {|
  clientMutationId?: ?string,
  current_password: string,
  new_password: string,
  new_password_confirmation?: ?string,
|};
export type ChangePasswordScreenMutationVariables = {|
  input: ChangePasswordInput
|};
export type ChangePasswordScreenMutationResponse = {|
  +changePassword: ?{|
    +success: ?boolean
  |}
|};
export type ChangePasswordScreenMutation = {|
  variables: ChangePasswordScreenMutationVariables,
  response: ChangePasswordScreenMutationResponse,
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
  "fragment": {
    "kind": "Fragment",
    "name": "ChangePasswordScreenMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "ChangePasswordScreenMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "ChangePasswordScreenMutation",
    "id": null,
    "text": "mutation ChangePasswordScreenMutation(\n  $input: ChangePasswordInput!\n) {\n  changePassword(input: $input) {\n    success\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '4648e9042b5367f26a73cc83a596b469';
module.exports = node;
