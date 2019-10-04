/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type DiscussionLike_discussion$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type Post$ref: FragmentReference;
export type Post = {|
  +discussion: ?{|
    +id: string,
    +_id: string,
    +name: ?string,
    +body: ?string,
    +created_at: ?number,
    +comment_count: ?number,
    +feature_photo: ?{|
      +url: ?string,
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
  |},
  +$refType: Post$ref,
|};
*/


const node/*: ReaderFragment*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "_id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "Post",
  "type": "Query",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "id",
      "type": "ID!"
    }
  ],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "discussion",
      "storageKey": null,
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "id",
          "type": "ID!"
        }
      ],
      "concreteType": "Discussion",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "comment_count",
          "args": null,
          "storageKey": null
        },
        (v0/*: any*/),
        (v1/*: any*/),
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "body",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "created_at",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "FragmentSpread",
          "name": "DiscussionLike_discussion",
          "args": null
        },
        (v2/*: any*/),
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "feature_photo",
          "storageKey": null,
          "args": null,
          "concreteType": "Photo",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "url",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "height",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "width",
              "args": null,
              "storageKey": null
            }
          ]
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "public_url",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "group",
          "storageKey": null,
          "args": null,
          "concreteType": "Group",
          "plural": false,
          "selections": [
            (v2/*: any*/),
            (v0/*: any*/),
            (v1/*: any*/),
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "permalink",
              "args": null,
              "storageKey": null
            }
          ]
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "user",
          "storageKey": null,
          "args": null,
          "concreteType": "User",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            (v2/*: any*/),
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "username",
              "args": null,
              "storageKey": null
            },
            (v1/*: any*/),
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "profile_picture_name",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "bio",
              "args": null,
              "storageKey": null
            }
          ]
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "parsed_body",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
})();
// prettier-ignore
(node/*: any*/).hash = '9fe7aa940120dd6ff999e322def94788';
module.exports = node;
