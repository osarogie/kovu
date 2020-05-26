/**
 * @flow
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
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input",
    "type": "ChangePasswordInput!"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "ChangePasswordPayload",
    "kind": "LinkedField",
    "name": "changePassword",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "success",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ChangePasswordScreenMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChangePasswordScreenMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "ChangePasswordScreenMutation",
    "operationKind": "mutation",
    "text": "mutation ChangePasswordScreenMutation(\n  $input: ChangePasswordInput!\n) {\n  changePassword(input: $input) {\n    success\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '4648e9042b5367f26a73cc83a596b469';

module.exports = node;
