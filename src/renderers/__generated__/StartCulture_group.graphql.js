/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type StartCulture_group$ref: FragmentReference;
declare export opaque type StartCulture_group$fragmentType: StartCulture_group$ref;
export type StartCulture_group = {|
  +id: string,
  +_id: string,
  +name: ?string,
  +body: ?string,
  +is_private: ?boolean,
  +$refType: StartCulture_group$ref,
|};
export type StartCulture_group$data = StartCulture_group;
export type StartCulture_group$key = {
  +$data?: StartCulture_group$data,
  +$fragmentRefs: StartCulture_group$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StartCulture_group",
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
      "name": "is_private",
      "storageKey": null
    }
  ],
  "type": "Group"
};
// prettier-ignore
(node/*: any*/).hash = '6b82b694d4cd885ddb5ce624a82761f6';

module.exports = node;
