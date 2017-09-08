/**
 * @flow
 * @relayHash 01f82fca7172628cc0a19a403527c26e
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type ChangePasswordScreenMutationVariables = {|
  input: {
    clientMutationId?: ?string;
    current_password: string;
    new_password: string;
    new_password_confirmation?: ?string;
  };
|};

export type ChangePasswordScreenMutationResponse = {|
  +changePassword: ?{|
    +success: ?boolean;
  |};
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

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "ChangePasswordInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ChangePasswordScreenMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "ChangePasswordInput!"
          }
        ],
        "concreteType": "ChangePasswordPayload",
        "name": "changePassword",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "success",
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
  "name": "ChangePasswordScreenMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "ChangePasswordInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "ChangePasswordScreenMutation",
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
            "type": "ChangePasswordInput!"
          }
        ],
        "concreteType": "ChangePasswordPayload",
        "name": "changePassword",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "success",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation ChangePasswordScreenMutation(\n  $input: ChangePasswordInput!\n) {\n  changePassword(input: $input) {\n    success\n  }\n}\n"
};

module.exports = batch;
