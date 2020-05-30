import React from 'react'
import QueryRendererProxy from './QueryRendererProxy'

import { createPaginationContainer, graphql } from 'react-relay'
import { VerticalPaginationList } from '../relay/pagination/VerticalPaginationList'
import PostListItem from '../fragments/PostListItem'

const FeedPaginationContainer = createPaginationContainer(
  VerticalPaginationList,
  {
    feed: graphql`
      fragment Feed_feed on Feed
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 10 }
          cursor: { type: "String" }
        ) {
        discussions(first: $count, after: $cursor)
          @connection(key: "Feed_discussions") {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              id
              ...PostListItem_discussion
            }
          }
        }
      }
    `,
  },
  {
    direction: 'forward',
    getConnectionFromProps(props) {
      return props.feed?.discussions
    },
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount,
      }
    },
    getVariables(props, { count, cursor, size }, fragmentVariables) {
      return {
        count,
        cursor,
      }
    },
    variables: { cursor: null },
    query: graphql`
      query FeedPaginationQuery($count: Int!, $cursor: String) {
        feed {
          ...Feed_feed @arguments(count: $count, cursor: $cursor)
        }
      }
    `,
  },
)

export default props => {
  return (
    <QueryRendererProxy
      query={graphql`
        query FeedQuery($count: Int!, $cursor: String) {
          feed {
            ...Feed_feed @arguments(count: $count, cursor: $cursor)
          }
        }
      `}
      variables={{
        cursor: null,
        count: 10,
      }}
      render={data => (
        <FeedPaginationContainer
          propName="feed"
          fieldName="discussions"
          feed={data.props.feed}
          emptyListMessage="No posts yet"
          renderItem={({ item }) => (
            <PostListItem discussion={item.node} {...props} />
          )}
        />
      )}
    />
  )
}
