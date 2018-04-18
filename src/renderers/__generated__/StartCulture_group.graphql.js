/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
import type { FragmentReference } from 'relay-runtime';
declare export opaque type StartCulture_group$ref: FragmentReference;
export type StartCulture_group = {|
  +id: string,
  +_id: string,
  +name: ?string,
  +body: ?string,
  +is_private: ?boolean,
  +$refType: StartCulture_group$ref,
|};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "StartCulture_group",
  "type": "Group",
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
      "name": "is_private",
      "args": null,
      "storageKey": null
    }
  ]
};
(node/*: any*/).hash = '6b82b694d4cd885ddb5ce624a82761f6';
module.exports = node;
