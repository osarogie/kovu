/**
 * @flow
 * @relayHash e810ad8272958ddd9c4c2ab9a9dfbb26
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type DiscussionLike_discussion$ref = any;
export type DiscussionLikeLikeDiscussionMutationVariables = {|
  input: {
    clientMutationId?: ?string,
    id: string,
  },
|};
export type DiscussionLikeLikeDiscussionMutationResponse = {|
  +likeDiscussion: ?{|
    +discussion: ?{|
      +$fragmentRefs: DiscussionLike_discussion$ref,
    |},
  |},
|};
*/


/*
mutation DiscussionLikeLikeDiscussionMutation(
  $input: LikeDiscussionInput!
) {
  likeDiscussion(input: $input) {
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
    "type": "LikeDiscussionInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input",
    "type": "LikeDiscussionInput!"
  }
];
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "DiscussionLikeLikeDiscussionMutation",
  "id": null,
  "text": "mutation DiscussionLikeLikeDiscussionMutation(\n  $input: LikeDiscussionInput!\n) {\n  likeDiscussion(input: $input) {\n    discussion {\n      ...DiscussionLike_discussion\n      id\n    }\n  }\n}\n\nfragment DiscussionLike_discussion on Discussion {\n  id\n  _id\n  viewer_does_like\n  like_count\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "DiscussionLikeLikeDiscussionMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "likeDiscussion",
        "storageKey": null,
        "args": v1,
        "concreteType": "LikeDiscussionPayload",
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
    "name": "DiscussionLikeLikeDiscussionMutation",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "likeDiscussion",
        "storageKey": null,
        "args": v1,
        "concreteType": "LikeDiscussionPayload",
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
(node/*: any*/).hash = '67df771c86b87af49ca9f734b79d14ac';
module.exports = node;
