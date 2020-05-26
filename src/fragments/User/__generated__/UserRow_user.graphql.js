/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type FollowButton_user$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type UserRow_user$ref: FragmentReference;
declare export opaque type UserRow_user$fragmentType: UserRow_user$ref;
export type UserRow_user = {|
  +id: string,
  +_id: string,
  +name: ?string,
  +username: ?string,
  +bio: ?string,
  +profile_picture_name: ?string,
  +$fragmentRefs: FollowButton_user$ref,
  +$refType: UserRow_user$ref,
|};
export type UserRow_user$data = UserRow_user;
export type UserRow_user$key = {
  +$data?: UserRow_user$data,
  +$fragmentRefs: UserRow_user$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserRow_user",
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
      "name": "username",
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
      "name": "profile_picture_name",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FollowButton_user"
    }
  ],
  "type": "User"
};
// prettier-ignore
(node/*: any*/).hash = '51e28c8cf52e47a536b33e8f2e222eb9';

module.exports = node;
