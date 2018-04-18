/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
import type { FragmentReference } from 'relay-runtime';
declare export opaque type JoinButton_group$ref: FragmentReference;
export type JoinButton_group = {|
  +_id: string,
  +viewer_is_a_member: ?boolean,
  +is_private: ?boolean,
  +$refType: JoinButton_group$ref,
|};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "JoinButton_group",
  "type": "Group",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
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
      "name": "viewer_is_a_member",
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
(node/*: any*/).hash = 'ba7b656d16ae30d97588afb72c771b90';
module.exports = node;
