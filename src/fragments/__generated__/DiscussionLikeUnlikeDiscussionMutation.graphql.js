/**
 * @flow
 * @relayHash 2e951e327972272d3fab631a670ba2d5
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type DiscussionLike_discussion$ref = any;
export type DiscussionLikeUnlikeDiscussionMutationVariables = {|
  input: {
    clientMutationId?: ?string,
    id: string,
  },
|};
export type DiscussionLikeUnlikeDiscussionMutationResponse = {|
  +unlikeDiscussion: ?{|
    +discussion: ?{|
      +$fragmentRefs: DiscussionLike_discussion$ref,
    |},
  |},
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
    "kind": "LocalArgument",
    "name": "input",
    "type": "UnlikeDiscussionInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input",
    "type": "UnlikeDiscussionInput!"
  }
];
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "DiscussionLikeUnlikeDiscussionMutation",
  "id": null,
  "text": "mutation DiscussionLikeUnlikeDiscussionMutation(\n  $input: UnlikeDiscussionInput!\n) {\n  unlikeDiscussion(input: $input) {\n    discussion {\n      ...DiscussionLike_discussion\n      id\n    }\n  }\n}\n\nfragment DiscussionLike_discussion on Discussion {\n  id\n  _id\n  viewer_does_like\n  like_count\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "DiscussionLikeUnlikeDiscussionMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "unlikeDiscussion",
        "storageKey": null,
        "args": v1,
        "concreteType": "UnlikeDiscussionPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "discussion",
            "storageKey": null,
            "args": null,
            "concreteType": "Discussion",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "DiscussionLike_discussion",
                "args": null
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "DiscussionLikeUnlikeDiscussionMutation",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "unlikeDiscussion",
        "storageKey": null,
        "args": v1,
        "concreteType": "UnlikeDiscussionPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "discussion",
            "storageKey": null,
            "args": null,
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
                "name": "viewer_does_like",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "like_count",
                "args": null,
                "storageKey": null
              }
            ]
          }
        ]
      }
    ]
  }
};
})();
(node/*: any*/).hash = '9d7e088e2d551a5d4b1eb1717182509e';
module.exports = node;
