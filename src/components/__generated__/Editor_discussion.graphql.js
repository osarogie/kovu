/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type Editor_discussion$ref: FragmentReference;
declare export opaque type Editor_discussion$fragmentType: Editor_discussion$ref;
export type Editor_discussion = {|
  +id: string,
  +_id: string,
  +name: ?string,
  +body: ?string,
  +parsed_body: ?string,
  +$refType: Editor_discussion$ref,
|};
export type Editor_discussion$data = Editor_discussion;
export type Editor_discussion$key = {
  +$data?: Editor_discussion$data,
  +$fragmentRefs: Editor_discussion$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Editor_discussion",
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
      "name": "name",
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
      "kind": "ScalarField",
      "name": "parsed_body",
      "storageKey": null
    }
  ],
  "type": "Discussion"
};
// prettier-ignore
(node/*: any*/).hash = '8fc6a246e2e6fc2b873c45beb43b50f6';

module.exports = node;
