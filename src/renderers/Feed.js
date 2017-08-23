// @flow

import React from 'react'
import { View, Text } from 'react-native'
import PostList from '../fragments/PostList'
import QueryRendererProxy from './QueryRendererProxy'

import { createPaginationContainer, graphql } from 'react-relay'

const FeedPaginationContainer = createPaginationContainer(
  PostList,
  {
    discussionList: graphql`
      fragment Feed_discussionList on Feed {
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
    `
  },
  {
    direction: 'forward',
    getConnectionFromProps(props) {
      return props.discussionList && props.discussionList.discussions
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
        cursor,
        itemProps: props.itemProps
      }
    },
    variables: { cursor: null, size: '30x39' },
    query: graphql`
      query FeedPaginationQuery($count: Int!, $cursor: String) {
        feed {
          ...Feed_discussionList
        }
      }
    `
  }
)

export default (FeedQueryRenderer = props => {
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
      render={data =>
        <FeedPaginationContainer
          discussionList={data.props.feed}
          renderHeader={_ =>
            <Text
              style={{
                fontSize: 15,
                color: '#000',
                fontWeight: 'bold',
                padding: 20,
                paddingBottom: 8,
                borderBottomColor: '#ddd',
                borderBottomWidth: 1,
                backgroundColor: '#eee'
              }}
            >
              {"Today's Top Stories"}
            </Text>}
          itemProps={{ ...props /*, feature_photo: { width, height }*/ }}
        />}
    />
  )
})
