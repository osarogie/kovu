/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type DiscussionLike_discussion$ref: FragmentReference;
declare export opaque type DiscussionLike_discussion$fragmentType: DiscussionLike_discussion$ref;
export type DiscussionLike_discussion = {|
  +id: string,
  +_id: string,
  +viewer_does_like: ?boolean,
  +like_count: ?number,
  +$refType: DiscussionLike_discussion$ref,
|};
export type DiscussionLike_discussion$data = DiscussionLike_discussion;
export type DiscussionLike_discussion$key = {
  +$data?: DiscussionLike_discussion$data,
  +$fragmentRefs: DiscussionLike_discussion$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DiscussionLike_discussion",
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
      "name": "viewer_does_like",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "like_count",
      "storageKey": null
    }
  ],
  "type": "Discussion"
};
// prettier-ignore
(node/*: any*/).hash = 'ed66a8a29c79c7691a1d57c940e63dc7';

module.exports = node;
