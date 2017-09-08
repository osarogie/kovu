// @flow

import React from 'react'
import { View, Image, Text, PixelRatio } from 'react-native'
import Separator from '../components/Separator'
import CommentList from '../fragments/CommentList'
import PostThumb from '../fragments/PostThumb'
import styles from '../styles'
import colors from '../colors'
import Avatar from '../components/Avatar'
import CommentBox from '../components/CommentBox'
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
  night_mode: state.night_mode,
  user: state.user.user,
  loggedIn: state.user.loggedIn
})

export default (CommentsQueryRenderer = ({ id, gid, api_key, ...props }) => {
  const itemProps = props
  return (
    <QueryRendererProxy
      query={graphql`
        query CommentsQuery($count: Int!, $cursor: String, $id: ID!) {
          discussion(id: $id) {
            id
            ...PostThumb_discussion
            ...Comments_commentList
          }
        }
      `}
      variables={{ cursor: null, count: 5, id }}
      render={({ error, props, retry, environment }) => {
        // console.log(props)
        return (
          <View style={{ flex: 1 }}>
            <CommentPaginationContainer
              commentList={props.discussion}
              itemProps={itemProps}
              id={id}
              renderHeader={_ =>
                <View style={styles.container}>
                  <PostThumb discussion={props.discussion} {...itemProps} />
                  {/* <Separator /> */}
                  <CommentBox
                    {...itemProps}
                    environment={environment}
                    gid={gid}
                    id={id}
                  />
                </View>}
            />
            {/* <View style={{ flex: 1 }}>

            </View> */}
          </View>
        )
      }}
    />
  )
})
// PAGINATION CONTAINERS

const CommentPaginationContainer = createPaginationContainer(
  connect(mapStateToProps)(CommentList),
  {
    commentList: graphql`
      fragment Comments_commentList on Discussion {
        comments(first: $count, after: $cursor, by_latest: true)
          @connection(key: "Comment_comments", filters: []) {
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
      return { ...prevVars, count: totalCount }
    },
    getVariables(props, { count, cursor }, fragmentVariables) {
      return { count, cursor, id: props.id }
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
