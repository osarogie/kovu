/**
 * @flow
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
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id",
    "type": "ID!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EditorQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Discussion",
        "kind": "LinkedField",
        "name": "discussion",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Editor_discussion"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditorQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Discussion",
        "kind": "LinkedField",
        "name": "discussion",
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
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "EditorQuery",
    "operationKind": "query",
    "text": "query EditorQuery(\n  $id: ID!\n) {\n  discussion(id: $id) {\n    ...Editor_discussion\n    id\n  }\n}\n\nfragment Editor_discussion on Discussion {\n  id\n  _id\n  name\n  body\n  parsed_body\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'ecce506282116ac26a4972e75ff5df6d';

module.exports = node;
