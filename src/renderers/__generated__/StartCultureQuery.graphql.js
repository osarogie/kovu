/**
 * @flow
 * @relayHash 52bc414f6f390a2c2c44956a32bc7593
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type StartCulture_group$ref = any;
export type StartCultureQueryVariables = {|
  id: string,
|};
export type StartCultureQueryResponse = {|
  +group: ?{|
    +$fragmentRefs: StartCulture_group$ref,
  |},
|};
*/


/*
query StartCultureQuery(
  $id: ID!
) {
  group(id: $id) {
    ...StartCulture_group
    id
  }
}

fragment StartCulture_group on Group {
  id
  _id
  name
  body
  is_private
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "id",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id",
    "type": "ID!"
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "StartCultureQuery",
  "id": null,
  "text": "query StartCultureQuery(\n  $id: ID!\n) {\n  group(id: $id) {\n    ...StartCulture_group\n    id\n  }\n}\n\nfragment StartCulture_group on Group {\n  id\n  _id\n  name\n  body\n  is_private\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "StartCultureQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "group",
        "storageKey": null,
        "args": v1,
        "concreteType": "Group",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "StartCulture_group",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "StartCultureQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "group",
        "storageKey": null,
        "args": v1,
        "concreteType": "Group",
        "plural": false,
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
      }
    ]
  }
};
})();
(node/*: any*/).hash = '0aaa4625041e4e5e21d9ba516374f8e9';
module.exports = node;
