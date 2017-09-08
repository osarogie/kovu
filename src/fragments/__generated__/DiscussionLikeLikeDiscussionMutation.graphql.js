/**
 * @flow
 * @relayHash 3dd235e372ee449bace25a1df9ddd6c5
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type DiscussionLikeLikeDiscussionMutationVariables = {|
  input: {
    clientMutationId?: ?string;
    id: string;
  };
|};

export type DiscussionLikeLikeDiscussionMutationResponse = {|
  +likeDiscussion: ?{|
    +discussion: ?{| |};
  |};
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

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "LikeDiscussionInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "DiscussionLikeLikeDiscussionMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "LikeDiscussionInput!"
          }
        ],
        "concreteType": "LikeDiscussionPayload",
        "name": "likeDiscussion",
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
  "name": "DiscussionLikeLikeDiscussionMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "LikeDiscussionInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "DiscussionLikeLikeDiscussionMutation",
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
            "type": "LikeDiscussionInput!"
          }
        ],
        "concreteType": "LikeDiscussionPayload",
        "name": "likeDiscussion",
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
  "text": "mutation DiscussionLikeLikeDiscussionMutation(\n  $input: LikeDiscussionInput!\n) {\n  likeDiscussion(input: $input) {\n    discussion {\n      ...DiscussionLike_discussion\n      id\n    }\n  }\n}\n\nfragment DiscussionLike_discussion on Discussion {\n  id\n  _id\n  viewer_does_like\n  like_count\n}\n"
};

module.exports = batch;
