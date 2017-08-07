/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type PostListItem_discussion = {|
  +id: string;
  +name: ?string;
  +excerpt: ?string;
  +word_count: ?number;
  +user: ?{|
    +id: string;
    +name: ?string;
    +profile_picture: ?string;
  |};
  +group: ?{|
    +name: ?string;
    +permalink: ?string;
  |};
  +feature_photo: ?{|
    +id: string;
    +url: ?string;
    +height: ?number;
    +width: ?number;
  |};
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostListItem_discussion",
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "args": null,
      "name": "id",
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "args": null,
      "name": "name",
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "size",
          "value": 30,
          "type": "Int"
        }
      ],
      "name": "excerpt",
      "storageKey": "excerpt{\"size\":30}"
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "args": null,
      "name": "word_count",
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "args": null,
      "concreteType": "User",
      "name": "user",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "id",
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "name",
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "size",
              "value": 50,
              "type": "Int"
            }
          ],
          "name": "profile_picture",
          "storageKey": "profile_picture{\"size\":50}"
        }
      ],
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "args": null,
      "concreteType": "Group",
      "name": "group",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "name",
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "permalink",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "args": null,
      "concreteType": "Photo",
      "name": "feature_photo",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "id",
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "size",
              "value": "1000x960",
              "type": "String"
            }
          ],
          "name": "url",
          "storageKey": "url{\"size\":\"1000x960\"}"
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "height",
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "width",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Discussion"
};

module.exports = fragment;
