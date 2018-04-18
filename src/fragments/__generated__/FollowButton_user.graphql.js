/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
import type { FragmentReference } from 'relay-runtime';
declare export opaque type FollowButton_user$ref: FragmentReference;
export type FollowButton_user = {|
  +_id: string,
  +viewer_follows: ?boolean,
  +follows_viewer: ?boolean,
  +$refType: FollowButton_user$ref,
|};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "FollowButton_user",
  "type": "User",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "_id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "viewer_follows",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "follows_viewer",
      "args": null,
      "storageKey": null
    }
  ]
};
(node/*: any*/).hash = 'c62b3f7032c6f3d9549c436a1313e4a3';
module.exports = node;
