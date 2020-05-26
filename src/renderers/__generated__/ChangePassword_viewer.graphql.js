/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type ChangePassword_viewer$ref: FragmentReference;
declare export opaque type ChangePassword_viewer$fragmentType: ChangePassword_viewer$ref;
export type ChangePassword_viewer = {|
  +id: string,
  +_id: string,
  +$refType: ChangePassword_viewer$ref,
|};
export type ChangePassword_viewer$data = ChangePassword_viewer;
export type ChangePassword_viewer$key = {
  +$data?: ChangePassword_viewer$data,
  +$fragmentRefs: ChangePassword_viewer$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangePassword_viewer",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "_id",
      "storageKey": null
    }
  ],
  "type": "User"
};
// prettier-ignore
(node/*: any*/).hash = '00359a6473a75e61668667e343a4173b';

module.exports = node;
