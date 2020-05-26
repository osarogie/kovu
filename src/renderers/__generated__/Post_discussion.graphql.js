/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type DiscussionLike_discussion$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type Post_discussion$ref: FragmentReference;
declare export opaque type Post_discussion$fragmentType: Post_discussion$ref;
export type Post_discussion = {|
  +id: string,
  +_id: string,
  +name: ?string,
  +body: ?string,
  +created_at: ?number,
  +comment_count: ?number,
  +feature_photo: ?{|
    +url: ?string,
    +name: ?string,
    +height: ?number,
    +width: ?number,
  |},
  +public_url: ?string,
  +group: ?{|
    +_id: string,
    +id: string,
    +name: ?string,
    +permalink: ?string,
  |},
  +user: ?{|
    +id: string,
    +_id: string,
    +username: ?string,
    +name: ?string,
    +profile_picture_name: ?string,
    +bio: ?string,
  |},
  +parsed_body: ?string,
  +$fragmentRefs: DiscussionLike_discussion$ref,
  +$refType: Post_discussion$ref,
|};
export type Post_discussion$data = Post_discussion;
export type Post_discussion$key = {
  +$data?: Post_discussion$data,
  +$fragmentRefs: Post_discussion$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "_id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Post_discussion",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "body",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "created_at",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "comment_count",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Photo",
      "kind": "LinkedField",
      "name": "feature_photo",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "url",
          "storageKey": null
        },
        (v2/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "height",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "width",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "public_url",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Group",
      "kind": "LinkedField",
      "name": "group",
      "plural": false,
      "selections": [
        (v1/*: any*/),
        (v0/*: any*/),
        (v2/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "permalink",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "user",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "username",
          "storageKey": null
        },
        (v2/*: any*/),
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
          "name": "bio",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "parsed_body",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "DiscussionLike_discussion"
    }
  ],
  "type": "Discussion"
};
})();
// prettier-ignore
(node/*: any*/).hash = '88d16fc0eb6d25527ba724d349575328';

module.exports = node;
