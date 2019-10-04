/**
 * @flow
 * @relayHash df0e64efa66247da0482c1bd8be40759
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type PostListItem_discussion$ref = any;
export type VoteInput = {|
  clientMutationId?: ?string,
  option: string,
|};
export type PollViewVoteMutationVariables = {|
  input: VoteInput
|};
export type PollViewVoteMutationResponse = {|
  +vote: ?{|
    +discussion: ?{|
      +$fragmentRefs: PostListItem_discussion$ref
    |},
    +success: ?boolean,
    +message: ?string,
  |}
|};
export type PollViewVoteMutation = {|
  variables: PollViewVoteMutationVariables,
  response: PollViewVoteMutationResponse,
|};
*/


/*
mutation PollViewVoteMutation(
  $input: VoteInput!
) {
  vote(input: $input) {
    discussion {
      ...PostListItem_discussion
      id
    }
    success
    message
  }
}

fragment PostListItem_discussion on Discussion {
  id
  _id
  name
  public_url
  excerpt(size: 20)
  comments(by_latest: true, first: 3) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        id
        excerpt
        ...CommentListItem_comment
        __typename
      }
      cursor
    }
  }
  created_at
  user {
    id
    _id
    name
    username
    profile_picture_name
  }
  group {
    id
    _id
    name
    permalink
  }
  feature_photo {
    id
    _id
    height
    width
    name
  }
}

fragment CommentListItem_comment on Comment {
  id
  _id
  body
  created_at
  discussion_id
  excerpt
  discussion {
    id
    _id
  }
  user {
    id
    _id
    name
    username
    profile_picture_name
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "VoteInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input",
    "type": "VoteInput!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "success",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "message",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "_id",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v7 = [
  {
    "kind": "Literal",
    "name": "by_latest",
    "value": true,
    "type": "Boolean"
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 3,
    "type": "Int"
  }
],
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "created_at",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "user",
  "storageKey": null,
  "args": null,
  "concreteType": "User",
  "plural": false,
  "selections": [
    (v4/*: any*/),
    (v5/*: any*/),
    (v6/*: any*/),
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "username",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "profile_picture_name",
      "args": null,
      "storageKey": null
    }
  ]
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "PollViewVoteMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "vote",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "VotePayload",
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
                "name": "PostListItem_discussion",
                "args": null
              }
            ]
          },
          (v2/*: any*/),
          (v3/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "PollViewVoteMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "vote",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "VotePayload",
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
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "public_url",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "excerpt",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "size",
                    "value": 20,
                    "type": "Int"
                  }
                ],
                "storageKey": "excerpt(size:20)"
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "comments",
                "storageKey": "comments(by_latest:true,first:3)",
                "args": (v7/*: any*/),
                "concreteType": "CommentConnection",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "pageInfo",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "PageInfo",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "hasNextPage",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "endCursor",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "edges",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "CommentEdge",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "node",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Comment",
                        "plural": false,
                        "selections": [
                          (v4/*: any*/),
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "excerpt",
                            "args": null,
                            "storageKey": null
                          },
                          (v5/*: any*/),
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "body",
                            "args": null,
                            "storageKey": null
                          },
                          (v8/*: any*/),
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "discussion_id",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "discussion",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "Discussion",
                            "plural": false,
                            "selections": [
                              (v4/*: any*/),
                              (v5/*: any*/)
                            ]
                          },
                          (v9/*: any*/),
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "__typename",
                            "args": null,
                            "storageKey": null
                          }
                        ]
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "cursor",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  }
                ]
              },
              {
                "kind": "LinkedHandle",
                "alias": null,
                "name": "comments",
                "args": (v7/*: any*/),
                "handle": "connection",
                "key": "PostListItem_comments",
                "filters": []
              },
              (v8/*: any*/),
              (v9/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "group",
                "storageKey": null,
                "args": null,
                "concreteType": "Group",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "permalink",
                    "args": null,
                    "storageKey": null
                  }
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "feature_photo",
                "storageKey": null,
                "args": null,
                "concreteType": "Photo",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  (v5/*: any*/),
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "height",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "width",
                    "args": null,
                    "storageKey": null
                  },
                  (v6/*: any*/)
                ]
              }
            ]
          },
          (v2/*: any*/),
          (v3/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "PollViewVoteMutation",
    "id": null,
    "text": "mutation PollViewVoteMutation(\n  $input: VoteInput!\n) {\n  vote(input: $input) {\n    discussion {\n      ...PostListItem_discussion\n      id\n    }\n    success\n    message\n  }\n}\n\nfragment PostListItem_discussion on Discussion {\n  id\n  _id\n  name\n  public_url\n  excerpt(size: 20)\n  comments(by_latest: true, first: 3) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      node {\n        id\n        excerpt\n        ...CommentListItem_comment\n        __typename\n      }\n      cursor\n    }\n  }\n  created_at\n  user {\n    id\n    _id\n    name\n    username\n    profile_picture_name\n  }\n  group {\n    id\n    _id\n    name\n    permalink\n  }\n  feature_photo {\n    id\n    _id\n    height\n    width\n    name\n  }\n}\n\nfragment CommentListItem_comment on Comment {\n  id\n  _id\n  body\n  created_at\n  discussion_id\n  excerpt\n  discussion {\n    id\n    _id\n  }\n  user {\n    id\n    _id\n    name\n    username\n    profile_picture_name\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'f992738a0e52aecc052f1a766927f8a7';
module.exports = node;
