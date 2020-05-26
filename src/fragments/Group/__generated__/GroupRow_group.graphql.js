/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type GroupRow_group$ref: FragmentReference;
declare export opaque type GroupRow_group$fragmentType: GroupRow_group$ref;
export type GroupRow_group = {|
  +id: string,
  +_id: string,
  +name: ?string,
  +permalink: ?string,
  +body: ?string,
  +header_image: ?{|
    +name: ?string
  |},
  +$refType: GroupRow_group$ref,
|};
export type GroupRow_group$data = GroupRow_group;
export type GroupRow_group$key = {
  +$data?: GroupRow_group$data,
  +$fragmentRefs: GroupRow_group$ref,
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
  "name": "GroupRow_group",
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
(node/*: any*/).hash = '2cf894ebf6077944f175d16384d76633';

module.exports = node;
