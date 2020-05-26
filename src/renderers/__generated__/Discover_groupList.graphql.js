/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type GroupListItem_group$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type Discover_groupList$ref: FragmentReference;
declare export opaque type Discover_groupList$fragmentType: Discover_groupList$ref;
export type Discover_groupList = {|
  +groups: ?{|
    +pageInfo: {|
      +hasNextPage: boolean,
      +endCursor: ?string,
    |},
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +id: string,
        +$fragmentRefs: GroupListItem_group$ref,
      |}
    |}>,
  |},
  +$refType: Discover_groupList$ref,
|};
export type Discover_groupList$data = Discover_groupList;
export type Discover_groupList$key = {
  +$data?: Discover_groupList$data,
  +$fragmentRefs: Discover_groupList$ref,
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
    },
    {
      "kind": "RootArgument",
      "name": "q",
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
          "groups"
        ]
      }
    ]
  },
  "name": "Discover_groupList",
  "selections": [
    {
      "alias": "groups",
      "args": [
        {
          "kind": "Variable",
          "name": "q",
          "variableName": "q"
        }
      ],
      "concreteType": "GroupConnection",
      "kind": "LinkedField",
      "name": "__Discover_groups_connection",
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
          "concreteType": "GroupEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Group",
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
                  "name": "GroupListItem_group"
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
      "storageKey": null
    }
  ],
  "type": "Feed"
};
// prettier-ignore
(node/*: any*/).hash = 'ba0c823a1d40460c3a9bbcd4b2634627';

module.exports = node;
