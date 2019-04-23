// @flow

import React from 'react'
import { Text } from 'react-native'
import PostList from '../fragments/PostList'
import QueryRendererProxy from './QueryRendererProxy'
import styles from '../styles'

import { createPaginationContainer, graphql } from 'react-relay'

const FeedPaginationContainer = createPaginationContainer(
  PostList,
  {
    discussionList: graphql`
      fragment Feed_discussionList on Feed {
        top_stories(first: $count, after: $cursor)
          @connection(key: "Feed_top_stories") {
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
    `
  },
  {
    direction: 'forward',
    getConnectionFromProps(props) {
      return props.discussionList && props.discussionList.top_stories
    },
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount
      }
    },
    getVariables(props, { count, cursor, size }, fragmentVariables) {
      return {
        count,
        cursor
      }
    },
    variables: { cursor: null },
    query: graphql`
      query FeedPaginationQuery($count: Int!, $cursor: String) {
        feed {
          ...Feed_discussionList
        }
      }
    `
  }
)

export default props => {
  return (
    <QueryRendererProxy
      query={graphql`
        query FeedQuery($count: Int!, $cursor: String) {
          feed {
            ...Feed_discussionList
          }
        }
      `}
      variables={{
        cursor: null,
        count: 10
      }}
      render={data => (
        <FeedPaginationContainer
          discussionList={data.props.feed}
          renderHeader={renderPostsHeader}
          itemProps={{ ...props /*, feature_photo: { width, height }*/ }}
        />
      )}
    />
  )
}
const renderPostsHeader = _ => (
  <Text
    style={[styles.postsHeader, { marginTop: 53, fontSize: 20, padding: 15 }]}
  >
    Top Stories
  </Text>
)
