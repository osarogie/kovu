// @flow

import React from 'react'
import {
  View,
  Image,
  Text,
  PixelRatio,
  StyleSheet,
  findNodeHandle,
  Dimensions
} from 'react-native'
import Separator from '../components/Separator'
import Button from '../components/Button'
import PostList from '../fragments/PostList'
import GroupList from '../fragments/GroupList'
import FollowButton from '../fragments/FollowButton'
import styles from '../styles'
import colors from '../colors'
import Avatar from '../components/Avatar'
import QueryRendererProxy from './QueryRendererProxy'
import { imageUrl } from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'
import { Image as StyledImage } from '@shoutem/ui/components/Image'
import { BlurView } from 'react-native-blur'
import { withNavigation } from 'react-navigation'

import {
  createFragmentContainer,
  createPaginationContainer,
  graphql
} from 'react-relay'
import { connect } from 'react-redux'
import { navHelper } from '../helpers/getNavigation'

const mapStateToProps = state => ({
  night_mode: state.night_mode,
  current_user: state.user.user,
  loggedIn: state.user.loggedIn
})

const { width } = Dimensions.get('window')
const coverWidth = Math.min(1000, PixelRatio.getPixelSizeForLayoutSize(width))

// @withNavigation
class User extends React.Component {
  friendLabelStyle = { color: '#000', marginRight: 10 }
  friendValueStyle = { color: '#000', fontSize: 18 }
  state = { coverImageRef: null }

  constructor(props) {
    super(props)
    this.state = {
      isSameUser:
        props.loggedIn && props.user._id == props.current_user._id
          ? true
          : false
    }
  }

  imageLoaded = () => {
    this.setState({ coverImageRef: findNodeHandle(this.coverImage) })
  }

  openPicture = () => {
    navHelper(this).openProfilePicture(this.props.user)
  }

  renderFollowButton = _ =>
    this.props.loggedIn &&
    this.props.user._id == this.props.current_user._id ? null : (
      <FollowButton
        user={this.props.user}
        openLogin={this.props.openLogin}
        buttonStyle={{ marginTop: 10 }}
      />
    )

  renderFriends() {
    const { user, night_mode } = this.props

    return (
      <View style={[styles.fillRow, { marginTop: 20 }]}>
        <View style={{ flex: 1 }}>
          <Text style={this.friendLabelStyle}>Posts</Text>
          <Text style={this.friendValueStyle}>{user.discussion_count}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={this.friendLabelStyle}>Followers</Text>
          <Text style={this.friendValueStyle}>{user.follower_count}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={this.friendLabelStyle}>Following</Text>
          <Text style={this.friendValueStyle}>{user.following_count}</Text>
        </View>
      </View>
    )
  }
  renderEditButton = _ =>
    this.props.loggedIn &&
    this.props.user._id == this.props.current_user._id ? (
      <Button
        onPress={this.props.openEditProfile}
        title="Edit Profile"
        textStyle={{ color: '#05f' }}
        buttonStyle={{
          marginTop: 10,
          backgroundColor: 'transparent',
          borderRadius: 5,
          borderWidth: 1,
          borderColor: '#05f'
        }}
      />
    ) : null

  render() {
    const { user, night_mode } = this.props
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff'
        }}
      >
        {/* <View
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
        </View> */}
        <Image
          style={[
            { height: '100%', backgroundColor: '#f9f9f9' },
            _styles.coverImageBlur
          ]}
          ref={img => {
            this.coverImage = img
          }}
          source={{
            uri: imageUrl(user.profile_picture_name, `${coverWidth}x1000`)
          }}
          onLoadEnd={this.imageLoaded}
        />
        <BlurView
          style={_styles.coverImageBlur}
          viewRef={this.state.coverImageRef}
          blurType="light"
          blurAmount={1}
        />

        <View
          style={{
            padding: 20,
            flex: 1,
            flexDirection: 'row',
            backgroundColor: '#fffc' /*colors.get('container', night_mode)*/
          }}
        >
          <View style={{ marginRight: 10, flex: 1 }}>
            <Text style={styles.title}>{user.name}</Text>
            <Text style={{ flex: 1 }}>{user.bio}</Text>
            {this.renderFriends()}
            <View style={{ flexDirection: 'row' }}>
              {this.renderFollowButton()}
              {this.renderEditButton()}
            </View>
          </View>
          <Avatar
            width={100}
            rounded
            source={user}
            title={user.name}
            activeOpacity={0.7}
            onPress={this.openPicture}
            // showEditButton={this.state.isSameUser}
            // onEditPress={this.getPicture}
          />
        </View>
      </View>
    )
  }
}
User = withNavigation(User)
const _styles = StyleSheet.create({
  coverImageBlur: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
})

// UserFragmentContainer
const UserFragmentContainer = createFragmentContainer(
  connect(mapStateToProps)(User),
  graphql`
    fragment User_user on User {
      id
      _id
      name
      bio
      username
      profile_picture_name
      discussion_count
      follower_count
      following_count
      ...FollowButton_user
    }
  `
)

export default ({ id, api_key, ...props }) => {
  const itemProps = props
  return (
    <QueryRendererProxy
      query={graphql`
        query UserQuery($count: Int!, $cursor: String, $id: ID!) {
          user(id: $id) {
            ...User_user
            ...User_discussionList
            ...User_groupList
          }
        }
      `}
      variables={{ cursor: null, count: 5, id }}
      render={({ error, props, retry }) => (
        <UserPostsPaginationContainer
          discussionList={props.user}
          itemProps={itemProps}
          id={id}
          renderHeader={_ => (
            <View style={styles.container}>
              <UserFragmentContainer user={props.user} {...itemProps} />
              <View style={[styles.container, { backgroundColor: '#fff' }]}>
                <UserGroupsPaginationContainer
                  renderHeader={renderCultureHeader}
                  id={id}
                  groupList={props.user}
                  itemProps={itemProps}
                />
                {renderPostsHeader()}
              </View>
            </View>
          )}
        />
      )}
    />
  )
}
const renderCultureHeader = _ => (
  <Text
    style={{
      fontSize: 15,
      color: '#000',
      fontWeight: 'bold',
      paddingTop: 17,
      paddingLeft: 20,
      borderTopWidth: 1,
      borderTopColor: '#ddd'
    }}
  >
    Cultures
  </Text>
)

const renderPostsHeader = _ => <Text style={styles.postsHeader}>Posts</Text>
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
      return { ...prevVars, count: totalCount }
    },
    getVariables(props, { count, cursor }, fragmentVariables) {
      return { count, cursor, id: props.id }
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
    getVariables(props, { count, cursor }, fragmentVariables) {
      return { count, cursor, id: props.id }
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
