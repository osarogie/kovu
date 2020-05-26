/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type DiscussionLike_discussion$ref = any;
export type UnlikeDiscussionInput = {|
  clientMutationId?: ?string,
  id: string,
|};
export type DiscussionLikeUnlikeDiscussionMutationVariables = {|
  input: UnlikeDiscussionInput
|};
export type DiscussionLikeUnlikeDiscussionMutationResponse = {|
  +unlikeDiscussion: ?{|
    +discussion: ?{|
      +$fragmentRefs: DiscussionLike_discussion$ref
    |}
  |}
|};
export type DiscussionLikeUnlikeDiscussionMutation = {|
  variables: DiscussionLikeUnlikeDiscussionMutationVariables,
  response: DiscussionLikeUnlikeDiscussionMutationResponse,
|};
*/


/*
mutation DiscussionLikeUnlikeDiscussionMutation(
  $input: UnlikeDiscussionInput!
) {
  unlikeDiscussion(input: $input) {
    discussion {
      ...DiscussionLike_discussion
      id
    }
  }
}

fragment DiscussionLike_discussion on Discussion {
  id
  _id
  viewer_does_like
  like_count
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input",
    "type": "UnlikeDiscussionInput!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "DiscussionLikeUnlikeDiscussionMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UnlikeDiscussionPayload",
        "kind": "LinkedField",
        "name": "unlikeDiscussion",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Discussion",
            "kind": "LinkedField",
            "name": "discussion",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "DiscussionLike_discussion"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DiscussionLikeUnlikeDiscussionMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UnlikeDiscussionPayload",
        "kind": "LinkedField",
        "name": "unlikeDiscussion",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
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
                "name": "viewer_does_like",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "like_count",
                "storageKey": null
              }
            ],
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
    "name": "DiscussionLikeUnlikeDiscussionMutation",
    "operationKind": "mutation",
    "text": "mutation DiscussionLikeUnlikeDiscussionMutation(\n  $input: UnlikeDiscussionInput!\n) {\n  unlikeDiscussion(input: $input) {\n    discussion {\n      ...DiscussionLike_discussion\n      id\n    }\n  }\n}\n\nfragment DiscussionLike_discussion on Discussion {\n  id\n  _id\n  viewer_does_like\n  like_count\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '9d7e088e2d551a5d4b1eb1717182509e';

module.exports = node;
