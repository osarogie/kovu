// @flow

import React from 'react'
import { View, Text } from 'react-native'
import GroupList from '../fragments/GroupList'
import UserList from '../fragments/UserList'
import PostList from '../fragments/PostList'
import Separator from '../components/Separator'
import QueryRendererProxy from './QueryRendererProxy'

import { createPaginationContainer, graphql } from 'react-relay'

const DiscoverGroupsPaginationContainer = createPaginationContainer(
  GroupList,
  {
    groupList: graphql`
      fragment Discover_groupList on Feed {
        groups(first: $count, after: $cursor, q: $q)
          @connection(key: "Discover_groups") {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              id
              ...GroupListItem_group
            }
          }
        }
      }
    `
  },
  {
    direction: 'forward',
    getConnectionFromProps(props) {
      return props.groupList && props.groupList.groups
    },
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount
      }
    },
    getVariables(props, { count, cursor, size }, fragmentVariables) {
      console.log(props)
      return {
        count,
        cursor,
        q: props.q
      }
    },
    variables: { cursor: null, q: '' },
    query: graphql`
      query DiscoverPaginationQuery($count: Int!, $cursor: String, $q: String) {
        feed {
          ...Discover_groupList
        }
      }
    `
  }
)

const DiscoverUsersPaginationContainer = createPaginationContainer(
  UserList,
  {
    userList: graphql`
      fragment Discover_userList on Feed {
        users(first: $count, after: $cursor, q: $q)
          @connection(key: "Discover_users") {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              id
              ...UserListItem_user
            }
          }
        }
      }
    `
  },
  {
    direction: 'forward',
    getConnectionFromProps(props) {
      return props.userList && props.userList.users
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
        q: props.q
      }
    },
    variables: { cursor: null, size: '30x39' },
    query: graphql`
      query DiscoverPaginationQuery($count: Int!, $cursor: String, $q: String) {
        feed {
          ...Discover_userList
        }
      }
    `
  }
)

const DiscoverPostsPaginationContainer = createPaginationContainer(
  PostList,
  {
    discussionList: graphql`
      fragment Discover_discussionList on Feed {
        discussions(first: $count, after: $cursor, q: $q)
          @connection(key: "Discover_discussions") {
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
    getVariables(props, { count, cursor }, fragmentVariables) {
      return {
        count,
        cursor,
        q: props.q
      }
    },
    variables: { cursor: null, size: '30x39' },
    query: graphql`
      query DiscoverPaginationQuery($count: Int!, $cursor: String, $q: String) {
        feed {
          ...Discover_discussionList
        }
      }
    `
  }
)

export default (DiscoverQueryRenderer = ({ q, ...props }) => {
  return (
    <QueryRendererProxy
      query={graphql`
        query DiscoverQuery($count: Int!, $cursor: String, $q: String) {
          feed {
            ...Discover_userList
            ...Discover_discussionList
            ...Discover_groupList
          }
        }
      `}
      variables={{ cursor: null, count: 10, q }}
      render={data =>
        <DiscoverPostsPaginationContainer
          discussionList={data.props.feed}
          q={q}
          highlight
          itemProps={{ ...props }}
          renderHeader={_ =>
            <View style={{ flex: 1 }}>
              <DiscoverUsersPaginationContainer
                renderHeader={_ => renderUserHeader(q)}
                userList={data.props.feed}
                q={q}
                itemProps={{ ...props }}
              />
              <View style={{ flex: 1 }}>
                <DiscoverGroupsPaginationContainer
                  renderHeader={_ => renderCollectionHeader(q)}
                  groupList={data.props.feed}
                  q={q}
                  itemProps={{ ...props, f_width: 300, f_height: 200 }}
                />
              </View>
              {renderPostsLabel(q)}
            </View>}
        />}
    />
  )
})
const labelStyle = {
  flexDirection: 'row',
  alignItems: 'flex-end',
  padding: 20,
  paddingBottom: 8,
  fontSize: 15,
  color: '#000',
  fontWeight: 'bold'
}
const renderCollectionHeader = q =>
  <Text style={labelStyle}>
    Top Collections
    {renderMatch(q)}
  </Text>
const renderUserHeader = q =>
  <Text style={labelStyle}>
    People
    {renderMatch(q)}
  </Text>
const renderPostsLabel = q =>
  <Text style={[labelStyle, { backgroundColor: '#eee' }]}>
    Stories
    {renderMatch(q)}
  </Text>

const renderMatch = q => {
  if (q) {
    return (
      <Text style={{ fontSize: 13, color: '#777', fontStyle: 'italic' }}>
        {` that match `}
        <Text style={{ color: '#000' }}>
          {q}
        </Text>
      </Text>
    )
  }

  return null
}
