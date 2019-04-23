/**
 * @flow
 * @relayHash e393a396d158689a783f8c5a13ef07ad
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type Editor_discussion$ref = any;
export type EditorQueryVariables = {|
  id: string
|};
export type EditorQueryResponse = {|
  +discussion: ?{|
    +$fragmentRefs: Editor_discussion$ref
  |}
|};
export type EditorQuery = {|
  variables: EditorQueryVariables,
  response: EditorQueryResponse,
|};
*/


/*
query EditorQuery(
  $id: ID!
) {
  discussion(id: $id) {
    ...Editor_discussion
    id
  }
}

fragment Editor_discussion on Discussion {
  id
  _id
  name
  body
  parsed_body
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
  "fragment": {
    "kind": "Fragment",
    "name": "EditorQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "discussion",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Discussion",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "Editor_discussion",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "EditorQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "discussion",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Discussion",
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
            "name": "parsed_body",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "EditorQuery",
    "id": null,
    "text": "query EditorQuery(\n  $id: ID!\n) {\n  discussion(id: $id) {\n    ...Editor_discussion\n    id\n  }\n}\n\nfragment Editor_discussion on Discussion {\n  id\n  _id\n  name\n  body\n  parsed_body\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'ecce506282116ac26a4972e75ff5df6d';
module.exports = node;
