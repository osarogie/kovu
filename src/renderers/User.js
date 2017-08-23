// @flow

import React from 'react'
import { View, Image, Text, PixelRatio } from 'react-native'
import Separator from '../components/Separator'
import PostList from '../fragments/PostList'
import GroupList from '../fragments/GroupList'
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

class User extends React.Component<void, Props, any> {
  friendLabelStyle = { color: '#000', textAlign: 'center' }
  friendValueStyle = { color: '#000', textAlign: 'center', fontSize: 18 }
  renderFriends() {
    const { data: user, night_mode } = this.props

    return (
      <View style={[styles.fillRow, { marginTop: 20 }]}>
        <View style={{ flex: 1 }}>
          <Text style={this.friendLabelStyle}>Discussions</Text>
          <Text style={this.friendValueStyle}>
            {user.discussion_count}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={this.friendLabelStyle}>Followers</Text>
          <Text style={this.friendValueStyle}>
            {user.follower_count}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={this.friendLabelStyle}>Following</Text>
          <Text style={this.friendValueStyle}>
            {user.following_count}
          </Text>
        </View>
      </View>
    )
  }
  render() {
    const { data: user, night_mode } = this.props
    // alert(PixelRatio.getPixelSizeForLayoutSize(75) + '')

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff'
        }}
      >
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
        >
          <Image
            style={{
              flex: 1,
              resizeMode: 'contain',
              marginLeft: -30,
              marginTop: -30,
              transform: [{ rotate: '45deg' }]
            }}
            source={require('../images/welcome.png')}
          />
        </View>
        <View
          style={{
            padding: 20,
            flex: 1,
            alignItems: 'center',
            backgroundColor: '#fffc' /*colors.get('container', night_mode)*/
          }}
        >
          {this.renderProfilePicture()}
          <View style={{ margin: 20, flex: 1 }}>
            <Text style={[styles.title, { textAlign: 'center' }]}>
              {user.name}
            </Text>
            <Text style={{ flex: 1, textAlign: 'center' }}>
              {user.bio}
            </Text>
            {this.renderFriends()}
          </View>
        </View>
      </View>
    )
  }

  renderProfilePicture() {
    // console.log(this.props)
    const user = this.props.data
    const size = PixelRatio.getPixelSizeForLayoutSize(75)
    const uri = imageUrl(user.profile_picture_name, `${size}x${size}`)

    return (
      <Avatar
        large
        rounded
        source={{ uri }}
        title={user.name}
        activeOpacity={0.7}
      />
    )
  }
}

// UserFragmentContainer
const UserFragmentContainer = createFragmentContainer(
  User,
  graphql`
    fragment User on User {
      id
      _id
      name
      bio
      username
      profile_picture_name
      discussion_count
      follower_count
      following_count
    }
  `
)

export default (UserQueryRenderer = ({ id, api_key, ...props }) => {
  const itemProps = props
  return (
    <QueryRendererProxy
      query={graphql`
        query UserQuery($count: Int!, $cursor: String, $id: ID!) {
          user(id: $id) {
            ...User
            ...User_discussionList
            ...User_groupList
          }
        }
      `}
      variables={{ cursor: null, count: 5, id }}
      render={({ error, props, retry }) =>
        <UserPostsPaginationContainer
          discussionList={props.user}
          itemProps={itemProps}
          renderHeader={_ =>
            <View style={styles.container}>
              <UserFragmentContainer data={props.user} />
              <Separator />
              <View style={[styles.container, { backgroundColor: '#f9f9f9' }]}>
                <UserGroupsPaginationContainer
                  renderHeader={renderCollectionHeader}
                  groupList={props.user}
                  itemProps={itemProps}
                />
              </View>
            </View>}
        />}
    />
  )
})
const renderCollectionHeader = _ =>
  <View
    style={{
      flexDirection: 'row',
      marginTop: 17,
      marginLeft: 20
    }}
  >
    <Text style={{ fontSize: 15, color: '#000', fontWeight: 'bold' }}>
      Collections
    </Text>
    {/* <Icon
      name="ios-arrow-forward"
      style={[styles.icon, { marginLeft: 10, marginTop: 2 }]}
      size={15}
      color={colors.get('black')}
    /> */}
  </View>
// PAGINATION CONTAINERS

const UserPostsPaginationContainer = createPaginationContainer(
  PostList,
  {
    discussionList: graphql`
      fragment User_discussionList on User {
        discussions(first: $count, after: $cursor, by_latest: true)
          @connection(key: "User_discussions") {
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
      query UserPostsPaginationQuery($count: Int!, $cursor: String, $id: ID!) {
        user(id: $id) {
          ...User_discussionList
        }
      }
    `
  }
)

const UserGroupsPaginationContainer = createPaginationContainer(
  GroupList,
  {
    groupList: graphql`
      fragment User_groupList on User {
        groups_in(first: $count, after: $cursor)
          @connection(key: "User_groups_in") {
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
      return props.groupList && props.groupList.groups_in
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
      query UserGroupsPaginationQuery($count: Int!, $cursor: String, $id: ID!) {
        user(id: $id) {
          ...User_groupList
        }
      }
    `
  }
)
