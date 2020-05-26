/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type PostListItem_discussion$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type User_discussionList$ref: FragmentReference;
declare export opaque type User_discussionList$fragmentType: User_discussionList$ref;
export type User_discussionList = {|
  +discussions: ?{|
    +pageInfo: {|
      +hasNextPage: boolean,
      +endCursor: ?string,
    |},
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +id: string,
        +$fragmentRefs: PostListItem_discussion$ref,
      |}
    |}>,
  |},
  +$refType: User_discussionList$ref,
|};
export type User_discussionList$data = User_discussionList;
export type User_discussionList$key = {
  +$data?: User_discussionList$data,
  +$fragmentRefs: User_discussionList$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "count",
      "type": "Int"
    },
    {
      "kind": "RootArgument",
      "name": "cursor",
      "type": "String"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "count",
        "cursor": "cursor",
        "direction": "forward",
        "path": [
          "discussions"
        ]
      }
    ]
  },
  "name": "User_discussionList",
  "selections": [
    {
      "alias": "discussions",
      "args": [
        {
          "kind": "Literal",
          "name": "by_latest",
          "value": true
        }
      ],
      "concreteType": "DiscussionConnection",
      "kind": "LinkedField",
      "name": "__User_discussions_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "PageInfo",
          "kind": "LinkedField",
          "name": "pageInfo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasNextPage",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endCursor",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "DiscussionEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Discussion",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
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
                  "name": "__typename",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "PostListItem_discussion"
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "__User_discussions_connection(by_latest:true)"
    }
  ],
  "type": "User"
};
// prettier-ignore
(node/*: any*/).hash = 'c4652c8e007aea79a9aa368c1a4baa7e';

module.exports = node;
