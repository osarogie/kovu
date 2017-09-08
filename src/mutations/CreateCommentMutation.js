import { commitMutation, graphql } from 'react-relay'
import { ConnectionHandler } from 'relay-runtime'

const mutation = graphql`
  mutation CreateCommentMutation($input: CreateCommentInput!) {
    createComment(input: $input) {
      success
      comment {
        ...CommentListItem_comment
        user {
          ...UserListItem_user
        }
      }
    }
  }
`

function sharedUpdater(store, discussion_id, newEdge) {
  const discussionProxy = store.get(discussion_id)
  const CC = ConnectionHandler
  const St = store
  const ne = newEdge

  debugger
  const conn = ConnectionHandler.getConnection(
    discussionProxy,
    'Comment_comments'
  )
  if (conn) {
    ConnectionHandler.insertEdgeBefore(conn, newEdge)
  }
}

let tempID = 0

function commit(environment, { body, discussion_id, gid }, config = {}) {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        body,
        discussion_id
      }
    },
    ...config
    // updater: store => {
    //   const payload = store.getRootField('createComment')
    //   const newEdge = payload.getLinkedRecord('comment')
    //   sharedUpdater(store, gid, newEdge)
    // }
    // optimisticUpdater: store => {
    //   const id = 'client:newTodo:' + tempID++
    //   const node = store.create(id, 'Todo')
    //   node.setValue(text, 'text')
    //   node.setValue(id, 'id')
    //   const newEdge = store.create('client:newEdge:' + tempID++, 'TodoEdge')
    //   newEdge.setLinkedRecord(node, 'node')
    //   sharedUpdater(store, user, newEdge)
    //   const discussionProxy = store.get(user.id)
    //   discussionProxy.setValue(discussionProxy.getValue('totalCount') + 1, 'totalCount')
    // }
    // configs: [
    //   {
    //     type: 'RANGE_ADD',
    //     parentID: 'discussion_gid',
    //     connectionInfo: [
    //       {
    //         key: '',
    //         rangeBehavior: 'prepend'
    //       }
    //     ],
    //     edgeName: 'comment'
    //   }
    // ]
  })
}

export default { commit }
