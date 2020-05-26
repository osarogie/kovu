/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type FollowButton_user$ref: FragmentReference;
declare export opaque type FollowButton_user$fragmentType: FollowButton_user$ref;
export type FollowButton_user = {|
  +_id: string,
  +viewer_follows: ?boolean,
  +follows_viewer: ?boolean,
  +$refType: FollowButton_user$ref,
|};
export type FollowButton_user$data = FollowButton_user;
export type FollowButton_user$key = {
  +$data?: FollowButton_user$data,
  +$fragmentRefs: FollowButton_user$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FollowButton_user",
  "selections": [
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
      "name": "viewer_follows",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "follows_viewer",
      "storageKey": null
    }
  ],
  "type": "User"
};
// prettier-ignore
(node/*: any*/).hash = 'c62b3f7032c6f3d9549c436a1313e4a3';

module.exports = node;
