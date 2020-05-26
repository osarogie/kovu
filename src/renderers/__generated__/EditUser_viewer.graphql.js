/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type EditUser_viewer$ref: FragmentReference;
declare export opaque type EditUser_viewer$fragmentType: EditUser_viewer$ref;
export type EditUser_viewer = {|
  +id: string,
  +_id: string,
  +name: ?string,
  +bio: ?string,
  +username: ?string,
  +profile_picture_name: ?string,
  +$refType: EditUser_viewer$ref,
|};
export type EditUser_viewer$data = EditUser_viewer;
export type EditUser_viewer$key = {
  +$data?: EditUser_viewer$data,
  +$fragmentRefs: EditUser_viewer$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EditUser_viewer",
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "bio",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "username",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "profile_picture_name",
      "storageKey": null
    }
  ],
  "type": "User"
};
// prettier-ignore
(node/*: any*/).hash = '907869621d7105b3cb7aa35e0ec5ddf4';

module.exports = node;
