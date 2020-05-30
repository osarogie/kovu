import { commitMutation, graphql } from 'react-relay'

export function voteMutation({ option, environment }, requireViewer, config) {
  // if (!requireViewer('Please login to vote')) return
  const variables = {
    input: { option },
  }

  commitMutation(environment, {
    variables,
    mutation: graphql`
      mutation voteMutation($input: VoteInput!) {
        vote(input: $input) {
          discussion {
            ...PostListItem_discussion
          }
          success
          message
        }
      }
    `,
    ...config,
  })
}
