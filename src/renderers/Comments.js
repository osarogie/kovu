// @flow

import React from 'react'
import { View, Image, Text, PixelRatio } from 'react-native'
import Separator from '../components/Separator'
import CommentList from '../fragments/CommentList'
import PostThumb from '../components/PostThumb'
import styles from '../styles'
import colors from '../colors'
import { Avatar } from 'react-native-elements'
import QueryRendererProxy from './QueryRendererProxy'
import { imageUrl } from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

import {
  createFragmentContainer,
  createPaginationContainer,
  graphql
} from 'react-relay'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  night_mode: state.night_mode
})
// PostFragmentContainer
const PostFragmentContainer = createFragmentContainer(
  PostThumb,
  graphql`
    fragment Comments_discussion on Discussion {
      id
      _id
      name
      excerpt(size: 10)
      word_count
      created_at
      user {
        id
        _id
        name
        profile_picture_name
      }
      group {
        name
        permalink
      }
    }
  `
)

export default (CommentsQueryRenderer = ({ id, api_key, ...props }) => {
  const itemProps = props
  return (
    <QueryRendererProxy
      query={graphql`
        query CommentsQuery($count: Int!, $cursor: String, $id: ID!) {
          discussion(id: $id) {
            ...Comments_discussion
            ...Comments_commentList
          }
        }
      `}
      variables={{ cursor: null, count: 5, id }}
      render={({ error, props, retry }) => {
        console.log(props)
        return (
          <CommentPaginationContainer
            commentList={props.discussion}
            itemProps={itemProps}
            renderHeader={_ =>
              <View style={styles.container}>
                <PostFragmentContainer
                  discussion={props.discussion}
                  {...itemProps}
                />
                <Separator />
              </View>}
          />
        )
      }}
    />
  )
})
// PAGINATION CONTAINERS

const CommentPaginationContainer = createPaginationContainer(
  CommentList,
  {
    commentList: graphql`
      fragment Comments_commentList on Discussion {
        comments(first: $count, after: $cursor)
          @connection(key: "Comment_comments") {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              id
              ...CommentListItem_comment
            }
          }
        }
      }
    `
  },
  {
    direction: 'forward',
    getConnectionFromProps(props) {
      return props.commentList && props.commentList.comments
    },
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount
      }
    },
    getVariables(props, { count, cursor, id }, fragmentVariables) {
      return {
        count,
        cursor,
        id,
        itemProps: props.itemProps
      }
    },
    variables: { cursor: null },
    query: graphql`
      query CommentsPaginationQuery($count: Int!, $cursor: String, $id: ID!) {
        discussion(id: $id) {
          ...Comments_commentList
        }
      }
    `
  }
)
