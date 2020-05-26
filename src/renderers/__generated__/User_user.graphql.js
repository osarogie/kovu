/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type FollowButton_user$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type User_user$ref: FragmentReference;
declare export opaque type User_user$fragmentType: User_user$ref;
export type User_user = {|
  +id: string,
  +_id: string,
  +name: ?string,
  +bio: ?string,
  +username: ?string,
  +profile_picture_name: ?string,
  +discussion_count: ?number,
  +follower_count: ?number,
  +following_count: ?number,
  +$fragmentRefs: FollowButton_user$ref,
  +$refType: User_user$ref,
|};
export type User_user$data = User_user;
export type User_user$key = {
  +$data?: User_user$data,
  +$fragmentRefs: User_user$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "User_user",
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "discussion_count",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "follower_count",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "following_count",
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
(node/*: any*/).hash = '4e653f71782722b995ad0c08431f2e2c';

module.exports = node;
