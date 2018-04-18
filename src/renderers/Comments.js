// @flow

import React from 'react'
import {
  View,
  Image,
  Text,
  PixelRatio,
  KeyboardAvoidingView
} from 'react-native'
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
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
          <View
            style={{ flex: 1 }}
            // behavior="padding"
            // onKeyboardWillShow={frames => {
            //   console.log('Keyboard event', frames)
            // }}
            // ref={ref => (this.scroll = ref)}
            // resetScrollToCoords={{ x: 0, y: 0 }}
            // // contentContainerStyle={{ alignItems: 'center' }}
            // style={{ flex: 1 }}
          >
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              // behavior="padding"
              // onKeyboardWillShow={frames => {
              //   console.log('Keyboard event', frames)
              // }}
              // ref={ref => (this.scroll = ref)}
              // resetScrollToCoords={{ x: 0, y: 0 }}
              // // contentContainerStyle={{ alignItems: 'center' }}
              // style={{ flex: 1 }}
            >
              <CommentPaginationContainer
                commentList={props.discussion}
                itemProps={itemProps}
                id={id}
                renderHeader={_ => (
                  <View style={[styles.container, { marginBottom: 20 }]}>
                    <PostThumb discussion={props.discussion} {...itemProps} />
                    {/* <Separator /> */}
                  </View>
                )}
              />
              <CommentBox
                {...itemProps}
                environment={environment}
                gid={gid}
                id={id}
              />
              {/* <View style={{ flex: 1 }}>

            </View> */}
            </KeyboardAvoidingView>
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
