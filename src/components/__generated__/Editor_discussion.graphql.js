/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
import type { FragmentReference } from 'relay-runtime';
declare export opaque type Editor_discussion$ref: FragmentReference;
export type Editor_discussion = {|
  +id: string,
  +_id: string,
  +name: ?string,
  +body: ?string,
  +parsed_body: ?string,
  +$refType: Editor_discussion$ref,
|};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "Editor_discussion",
  "type": "Discussion",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
      "args": null,
      "storageKey": null
    },
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
      "name": "name",
      "args": null,
      "storageKey": null
    },
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
      "name": "parsed_body",
      "args": null,
      "storageKey": null
    }
  ]
};
(node/*: any*/).hash = '8fc6a246e2e6fc2b873c45beb43b50f6';
module.exports = node;
