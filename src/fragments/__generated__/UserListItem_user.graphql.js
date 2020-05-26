/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type FollowButton_user$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type UserListItem_user$ref: FragmentReference;
declare export opaque type UserListItem_user$fragmentType: UserListItem_user$ref;
export type UserListItem_user = {|
  +id: string,
  +_id: string,
  +name: ?string,
  +username: ?string,
  +bio: ?string,
  +profile_picture_name: ?string,
  +$fragmentRefs: FollowButton_user$ref,
  +$refType: UserListItem_user$ref,
|};
export type UserListItem_user$data = UserListItem_user;
export type UserListItem_user$key = {
  +$data?: UserListItem_user$data,
  +$fragmentRefs: UserListItem_user$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserListItem_user",
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
(node/*: any*/).hash = '4f91409e255c6a7e5c56527a07269ad2';

module.exports = node;
