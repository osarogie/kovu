/**
 * @flow
 * @relayHash 30ed1a9710ab4c520a2d3108493baed6
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type DiscussionLikeUnlikeDiscussionMutationVariables = {|
  input: {
    clientMutationId?: ?string;
    id: string;
  };
|};

export type DiscussionLikeUnlikeDiscussionMutationResponse = {|
  +unlikeDiscussion: ?{|
    +discussion: ?{| |};
  |};
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

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "UnlikeDiscussionInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "DiscussionLikeUnlikeDiscussionMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "UnlikeDiscussionInput!"
          }
        ],
        "concreteType": "UnlikeDiscussionPayload",
        "name": "unlikeDiscussion",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Discussion",
            "name": "discussion",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "DiscussionLike_discussion",
                "args": null
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
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "DiscussionLikeUnlikeDiscussionMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "UnlikeDiscussionInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "DiscussionLikeUnlikeDiscussionMutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "UnlikeDiscussionInput!"
          }
        ],
        "concreteType": "UnlikeDiscussionPayload",
        "name": "unlikeDiscussion",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Discussion",
            "name": "discussion",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "_id",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "viewer_does_like",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
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
  "text": "mutation DiscussionLikeUnlikeDiscussionMutation(\n  $input: UnlikeDiscussionInput!\n) {\n  unlikeDiscussion(input: $input) {\n    discussion {\n      ...DiscussionLike_discussion\n      id\n    }\n  }\n}\n\nfragment DiscussionLike_discussion on Discussion {\n  id\n  _id\n  viewer_does_like\n  like_count\n}\n"
};

module.exports = batch;
