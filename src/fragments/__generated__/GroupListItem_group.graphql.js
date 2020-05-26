/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type GroupListItem_group$ref: FragmentReference;
declare export opaque type GroupListItem_group$fragmentType: GroupListItem_group$ref;
export type GroupListItem_group = {|
  +id: string,
  +_id: string,
  +name: ?string,
  +permalink: ?string,
  +body: ?string,
  +header_image: ?{|
    +name: ?string
  |},
  +$refType: GroupListItem_group$ref,
|};
export type GroupListItem_group$data = GroupListItem_group;
export type GroupListItem_group$key = {
  +$data?: GroupListItem_group$data,
  +$fragmentRefs: GroupListItem_group$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = (function(){
var v0 = {
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
  "name": "GroupListItem_group",
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
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "permalink",
      "storageKey": null
    },
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
      "concreteType": "Photo",
      "kind": "LinkedField",
      "name": "header_image",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Group"
};
})();
// prettier-ignore
(node/*: any*/).hash = '18f3cda89f0d51396dc9a044644c798d';

module.exports = node;
