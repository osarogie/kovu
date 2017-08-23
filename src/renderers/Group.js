// @flow

import React from 'react'
import {
  View,
  Image,
  Text,
  PixelRatio,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import environment from '../../relay-environment'
import Separator from '../components/Separator'
import PostList from '../fragments/PostList'
import UserList from '../fragments/UserList'
import styles from '../styles'
import colors from '../colors'
import { Avatar } from 'react-native-elements'
import QueryRendererProxy from './QueryRendererProxy'
import Icon from 'react-native-vector-icons/Ionicons'
import { imageUrl } from '../utils'
import {
  createFragmentContainer,
  createPaginationContainer,
  graphql
} from 'react-relay'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  night_mode: state.night_mode
})

class Group extends React.Component<void, Props, any> {
  renderFeaturePhoto() {
    console.log(this.props)
    const { header_image } = this.props.data

    if (header_image) {
      const { width } = Dimensions.get('window')
      const height = header_image.height / header_image.width * width
      const f_width = PixelRatio.getPixelSizeForLayoutSize(width)
      const f_height = PixelRatio.getPixelSizeForLayoutSize(height)
      if (f_width > 1000 || f_height > 1000) {
        f_width = 1000
        f_height = 1000
      }
      // console.log(imageUrl(header_image.name, `${f_width}x${f_height}`))
      return (
        <View style={[styles.featurePhotoWarp, { height, width, flex: 1 }]}>
          <Image
            source={{
              uri: imageUrl(header_image.name, `${f_width}x${f_height}`)
            }}
            style={{
              height,
              width
            }}
          />
        </View>
      )
    }
    return null
  }

  renderUserInfo() {
    const { user } = this.props.data

    return (
      <TouchableOpacity
        style={{ flex: 1, flexDirection: 'row' }}
        onPress={_ => this.props.openProfile(user)}
      >
        <Text
          style={{
            flexDirection: 'row',
            marginBottom: 10,
            flex: 1,
            fontStyle: 'italic'
          }}
          numberOfLines={1}
        >
          <Text> by </Text>
          <Text style={{ color: '#000' }}>
            {user.name}
          </Text>
        </Text>
      </TouchableOpacity>
    )
  }

  render() {
    const { data: group, night_mode } = this.props

    return (
      <View style={{ backgroundColor: '#fff' }}>
        {this.renderFeaturePhoto()}
        <View
          style={{
            padding: 30,
            flexDirection: 'row',
            backgroundColor: colors.get('container', night_mode)
          }}
        >
          <View style={{ marginRight: 20, flex: 1 }}>
            <Text
              style={{
                marginRight: 10,
                marginTop: 10,
                color: '#000',
                fontWeight: 'bold',
                flex: 1,
                fontSize: 18
              }}
            >
              {group.name}
            </Text>
            {this.renderUserInfo()}
            <Text
              style={{
                marginBottom: 20,
                marginTop: 10,
                color: '#000',
                flex: 1,
                fontSize: 17
              }}
            >
              {group.body}
            </Text>
          </View>
          {this.renderProfilePicture()}
        </View>
      </View>
    )
  }

  renderProfilePicture() {
    // console.log(this.props)
    const { data: { user }, openProfile } = this.props
    const size = PixelRatio.getPixelSizeForLayoutSize(50)
    const image = user.profile_picture_name

    return (
      <Avatar
        medium
        rounded
        source={{ uri: imageUrl(image, `${size}x${size}`) }}
        onPress={_ => openProfile(user)}
        title={user.name}
        activeOpacity={0.7}
      />
    )
  }
}

// GroupFragmentContainer
const GroupFragmentContainer = createFragmentContainer(
  Group,
  graphql`
    fragment Group on Group {
      id
      _id
      name
      permalink
      body
      header_image {
        name
        height
        width
      }
      user {
        id
        _id
        name
        username
        profile_picture_name
      }
    }
  `
)

export default (GroupQueryRenderer = ({ id, api_key, ...props }) => {
  const itemProps = props
  return (
    <QueryRendererProxy
      query={graphql`
        query GroupQuery($count: Int!, $cursor: String, $id: ID!) {
          group(id: $id) {
            ...Group
            ...Group_discussionList
            ...Group_userList
          }
        }
      `}
      variables={{ cursor: null, count: 5, id }}
      render={({ error, props, retry }) =>
        <GroupPostsPaginationContainer
          discussionList={props.group}
          itemProps={itemProps}
          renderHeader={() =>
            <View style={styles.container}>
              <GroupFragmentContainer data={props.group} {...itemProps} />
              <Separator />
              <GroupUsersPaginationContainer
                userList={props.group}
                renderHeader={renderUsersHeader}
                itemProps={{ showGroupInfo: false, ...itemProps }}
              />
            </View>}
        />}
    />
  )
})
const renderUsersHeader = _ =>
  <View
    style={{
      flexDirection: 'row',
      marginTop: 17,
      marginLeft: 20
    }}
  >
    <Text style={{ fontSize: 15, color: '#000', fontWeight: 'bold' }}>
      Members
    </Text>
    {/* <Icon
      name="ios-arrow-forward"
      style={[styles.icon, { marginLeft: 10, marginTop: 2 }]}
      size={15}
      color={colors.get('black')}
    /> */}
  </View>
// PAGINATION CONTAINERS

const GroupPostsPaginationContainer = createPaginationContainer(
  PostList,
  {
    discussionList: graphql`
      fragment Group_discussionList on Group {
        discussions(first: $count, after: $cursor)
          @connection(key: "Group_discussions") {
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
      query GroupPostsPaginationQuery($count: Int!, $cursor: String, $id: ID!) {
        group(id: $id) {
          ...Group_discussionList
        }
      }
    `
  }
)

const GroupUsersPaginationContainer = createPaginationContainer(
  UserList,
  {
    userList: graphql`
      fragment Group_userList on Group {
        users(first: $count, after: $cursor) @connection(key: "Group_users") {
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
      query GroupUsersPaginationQuery($count: Int!, $cursor: String, $id: ID!) {
        group(id: $id) {
          ...Group_userList
        }
      }
    `
  }
)
