/**
 * @flow
 * @relayHash df652852f4583af46ac595af7876e0f8
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type CommentListItem_comment$ref = any;
type UserListItem_user$ref = any;
export type CreateCommentMutationVariables = {|
  input: {
    clientMutationId?: ?string,
    body: string,
    discussion_id: string,
  },
|};
export type CreateCommentMutationResponse = {|
  +createComment: ?{|
    +success: ?boolean,
    +comment: ?{|
      +user: ?{|
        +$fragmentRefs: UserListItem_user$ref,
      |},
      +$fragmentRefs: CommentListItem_comment$ref,
    |},
  |},
|};
*/


/*
mutation CreateCommentMutation(
  $input: CreateCommentInput!
) {
  createComment(input: $input) {
    success
    comment {
      ...CommentListItem_comment
      user {
        ...UserListItem_user
        id
      }
      id
    }
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

fragment UserListItem_user on User {
  id
  _id
  name
  username
  bio
  profile_picture_name
  ...FollowButton_user
}

fragment FollowButton_user on User {
  _id
  viewer_follows
  follows_viewer
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "CreateCommentInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input",
    "type": "CreateCommentInput!"
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
  "name": "id",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "_id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "CreateCommentMutation",
  "id": null,
  "text": "mutation CreateCommentMutation(\n  $input: CreateCommentInput!\n) {\n  createComment(input: $input) {\n    success\n    comment {\n      ...CommentListItem_comment\n      user {\n        ...UserListItem_user\n        id\n      }\n      id\n    }\n  }\n}\n\nfragment CommentListItem_comment on Comment {\n  id\n  _id\n  body\n  created_at\n  discussion_id\n  excerpt\n  discussion {\n    id\n    _id\n  }\n  user {\n    id\n    _id\n    name\n    username\n    profile_picture_name\n  }\n}\n\nfragment UserListItem_user on User {\n  id\n  _id\n  name\n  username\n  bio\n  profile_picture_name\n  ...FollowButton_user\n}\n\nfragment FollowButton_user on User {\n  _id\n  viewer_follows\n  follows_viewer\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "CreateCommentMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createComment",
        "storageKey": null,
        "args": v1,
        "concreteType": "CreateCommentPayload",
        "plural": false,
        "selections": [
          v2,
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "comment",
            "storageKey": null,
            "args": null,
            "concreteType": "Comment",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "CommentListItem_comment",
                "args": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "user",
                "storageKey": null,
                "args": null,
                "concreteType": "User",
                "plural": false,
                "selections": [
                  {
                    "kind": "FragmentSpread",
                    "name": "UserListItem_user",
                    "args": null
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateCommentMutation",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createComment",
        "storageKey": null,
        "args": v1,
        "concreteType": "CreateCommentPayload",
        "plural": false,
        "selections": [
          v2,
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "comment",
            "storageKey": null,
            "args": null,
            "concreteType": "Comment",
            "plural": false,
            "selections": [
              v3,
              v4,
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
                "name": "created_at",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "discussion_id",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "excerpt",
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
                  v3,
                  v4
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "user",
                "storageKey": null,
                "args": null,
                "concreteType": "User",
                "plural": false,
                "selections": [
                  v3,
                  v4,
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
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "bio",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "viewer_follows",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "follows_viewer",
                    "args": null,
                    "storageKey": null
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
};
})();
(node/*: any*/).hash = '623be6820831007db53eb8d4c4282802';
module.exports = node;
